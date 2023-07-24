import { Injectable, Logger } from '@nestjs/common';
import { PrivateMessageReadResource } from '../resources/private-message.read.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { EncodingService } from 'src/encoding/encoding.service';
import { SessionResource } from 'src/auth/resources/session.resource';
import { privateMessagesRegex } from '../config/private-messages.regex';
import { PrivateMessageFolder } from '../types';
import { UserResource } from 'src/users/resources/user.resource';
import { isDefined } from 'class-validator';
import { privateMessagesExceptions } from '../config/private-messages.exceptions';
import { parseAvatarUrl } from 'src/utility/forum.utility';

const LIST_INBOUND_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=1`;
const LIST_OUTBOUND_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=2`;
const LIST_SYSTEM_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=3`;
const MESSAGE_GET_URL = `${forumConfig.FORUM_URL}pm/?a=2&mid=`;

/**
 * Service for retrieving and creating private messages. Since the forum's
 * XML API does not include private messages, this service heavily
 * relies on parsing HTML.
 */
@Injectable()
export class PrivateMessagesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Returns a list of private messages.
   * @param session The session resource.
   * @param options.folder (optional) Filter private messages for the given folder.
   * @param options.unread (optional) Filter for unread/read messages.
   * @returns The list of private messages.
   */
  async findMany(
    session: SessionResource,
    options?: { folder?: PrivateMessageFolder; unread?: boolean },
  ): Promise<PrivateMessageReadResource[]> {
    if (options?.folder === PrivateMessageFolder.inbound) {
      return this.getFolder(
        LIST_INBOUND_URL,
        session,
        PrivateMessageFolder.inbound,
        options,
      );
    } else if (options?.folder === PrivateMessageFolder.outbound) {
      return this.getFolder(
        LIST_OUTBOUND_URL,
        session,
        PrivateMessageFolder.outbound,
        options,
      );
    } else if (options?.folder === PrivateMessageFolder.system) {
      return this.getFolder(
        LIST_SYSTEM_URL,
        session,
        PrivateMessageFolder.system,
        options,
      );
    } else {
      return [
        ...(await this.getFolder(
          LIST_INBOUND_URL,
          session,
          PrivateMessageFolder.inbound,
          options,
        )),
        ...(await this.getFolder(
          LIST_OUTBOUND_URL,
          session,
          PrivateMessageFolder.outbound,
          options,
        )),
        ...(await this.getFolder(
          LIST_SYSTEM_URL,
          session,
          PrivateMessageFolder.system,
          options,
        )),
      ];
    }
  }

  /**
   * Returns all private messages that belong tto the given folder.
   * @param session The session resource.
   * @param options.unread (optional) Filter for unread/read messages.
   * @returns The list of private messages.
   */
  async getFolder(
    url: string,
    session: SessionResource,
    folder: PrivateMessageFolder,
    options?: { unread?: boolean },
  ): Promise<PrivateMessageReadResource[]> {
    const { data } = await this.httpService.get(url, {
      cookie: session.cookie,
      decode: true,
    });
    return this.parseMessageList(data, session, folder, {
      unread: options?.unread,
    });
  }

  /**
   * Parses the given message list html to a list of private message.
   * Only contains header data (title, sender/recipient and date).
   * @param html The HTML document.
   * @param session The session resource.
   * @param folder The private message folder (inbound/outbound/system).
   * @param options.unread (optional) Filter for unread/read messages.
   * @returns The list of private messages.
   */
  parseMessageList(
    html: string,
    session: SessionResource,
    folder: PrivateMessageFolder,
    options?: {
      unread?: boolean;
    },
  ): PrivateMessageReadResource[] {
    const messages: PrivateMessageReadResource[] = [];
    const unreadMatches =
      options?.unread !== false
        ? html.matchAll(privateMessagesRegex.list.rowUnread)
        : [];
    const readMatches =
      options?.unread !== true
        ? html.matchAll(privateMessagesRegex.list.rowRead)
        : [];
    const createMessage = (match: RegExpMatchArray) => {
      try {
        return this.parseMessageListItem(match[1], folder);
      } catch (error) {
        Logger.error(
          `An error occured while parsing a private message header for user '${session.username}' (${error.message}). The message will be skipped.`,
          this.constructor.name,
        );
        return undefined;
      }
    };
    for (const match of unreadMatches) {
      const message = createMessage(match);
      if (message) messages.push(message);
    }
    for (const match of readMatches) {
      const message = createMessage(match);
      if (message) messages.push(message);
    }
    return messages;
  }

  /**
   * Parses a message list item. Only contains header data
   * (title, sender/recipient and date).
   * @param html The HTML string.
   * @param folder The private message folder (inbound/outbound/system).
   * @returns The private message.
   */
  parseMessageListItem(
    html: string,
    folder: PrivateMessageFolder,
  ): PrivateMessageReadResource {
    const idMatches = html.match(privateMessagesRegex.list.id);
    if (!idMatches || idMatches.length < 2) {
      throw new Error('Unable to retrieve message id.');
    }
    const id = idMatches[1];
    const titleMatches = html.match(privateMessagesRegex.list.title);
    if (!titleMatches || titleMatches.length < 2) {
      throw new Error('Unable to retrieve message title.');
    }
    const title = this.encodingService.decodeText(titleMatches[1]);
    const dateMatches = html.match(privateMessagesRegex.list.date);
    if (!dateMatches || dateMatches.length < 2) {
      throw new Error('Unable to retrieve message date.');
    }
    const date = dateMatches[1];
    const importantMatches = html.match(privateMessagesRegex.list.important);
    const important = isDefined(importantMatches);
    const unreadMatches = html.match(privateMessagesRegex.list.unread);
    const unread = isDefined(unreadMatches);

    const message: PrivateMessageReadResource = {
      id,
      title,
      date,
      folder,
      important,
      unread,
    };

    // Retrieving the sender/recipient may fail. If it does, we will assume
    // that 'System' is the sender/recipient.
    const recipientOrSenderIdMatches = html.match(
      privateMessagesRegex.list.recipientOrSenderId,
    );
    const recipientOrSenderNameMatches = html.match(
      privateMessagesRegex.list.recipientOrSenderName,
    );
    if (recipientOrSenderIdMatches && privateMessagesRegex) {
      if (
        folder === PrivateMessageFolder.inbound ||
        folder === PrivateMessageFolder.system
      ) {
        message.sender = {
          id: recipientOrSenderIdMatches[1],
          name: recipientOrSenderNameMatches[1],
        };
      } else if (folder === PrivateMessageFolder.outbound) {
        message.recipient = {
          id: recipientOrSenderIdMatches[1],
          name: recipientOrSenderNameMatches[1],
        };
      }
    } else if (
      folder === PrivateMessageFolder.inbound ||
      folder === PrivateMessageFolder.system
    ) {
      message.sender = { id: '0', name: 'System' };
    }
    return message;
  }

  /**
   * Returns a specific private message by id.
   * @param id The private message's id.
   * @param session The session resource.
   * @returns The private message.
   */
  async findById(
    id: string,
    session: SessionResource,
  ): Promise<PrivateMessageReadResource> {
    const url = `${MESSAGE_GET_URL}${id}`;
    const { data } = await this.httpService.get(url, {
      cookie: session.cookie,
      decode: true,
    });
    return this.parseMessage(id, data);
  }

  /**
   * Parses the given private message HTML document and returns a private message object.
   * @param id The message id.
   * @param html The HTML document.
   * @returns The private message.
   */
  parseMessage(id: string, html: string): PrivateMessageReadResource {
    const errorMatches = html.match(privateMessagesRegex.message.error);
    if (errorMatches) {
      const wrongIdMatches = html.match(privateMessagesRegex.message.wrongId);
      if (wrongIdMatches) {
        throw privateMessagesExceptions.findById.notFound;
      } else {
        throw privateMessagesExceptions.findById.unknownError;
      }
    }
    const titleMatches = html.match(privateMessagesRegex.message.title);
    if (!titleMatches || titleMatches.length < 1) {
      throw new Error('Unable to retrieve message title.');
    }
    const title = titleMatches[1];
    const folderMatches = html.match(privateMessagesRegex.message.folder);
    if (!folderMatches || folderMatches.length < 1) {
      throw new Error('Unable to retrieve message folder.');
    }
    let folder: PrivateMessageFolder = PrivateMessageFolder.inbound;
    switch (folderMatches[1]) {
      case 'Ausgang':
        folder = PrivateMessageFolder.inbound;
        break;
      case 'System':
        folder = PrivateMessageFolder.system;
        break;
      default:
        folder = PrivateMessageFolder.inbound;
    }
    const dateMatches = html.match(privateMessagesRegex.message.date);
    if (!dateMatches || dateMatches.length < 1) {
      throw new Error('Unable to retrieve message date.');
    }
    const date = dateMatches[1];
    const contentMatches = html.match(privateMessagesRegex.message.content);
    if (!contentMatches || contentMatches.length < 1) {
      throw new Error('unable to retrieve message content.');
    }
    const content = contentMatches[1];
    const unreadMatches = isDefined(
      html.match(privateMessagesRegex.message.unread),
    );
    const unread = isDefined(unreadMatches);
    const importantMatches = html.match(privateMessagesRegex.message.important);
    const important = isDefined(importantMatches);

    const senderIdMatches = html.match(privateMessagesRegex.message.senderId);
    const senderNameMatches = html.match(
      privateMessagesRegex.message.senderName,
    );
    let sender: UserResource | undefined = undefined;
    if (senderIdMatches && senderNameMatches) {
      const senderAvatarUrlMatches = html.match(
        privateMessagesRegex.message.senderAvatarUrl,
      );
      let avatarUrl: string | undefined;
      if (senderAvatarUrlMatches)
        avatarUrl = parseAvatarUrl(senderAvatarUrlMatches[1]);
      sender = {
        id: senderIdMatches[1],
        name: senderNameMatches[1],
        avatarUrl,
      };
    }

    const recipient: UserResource | undefined = undefined;

    const message: PrivateMessageReadResource = {
      id,
      title,
      date,
      folder,
      content,
      sender,
      recipient,
      important,
      unread,
    };
    return message;
  }
}
