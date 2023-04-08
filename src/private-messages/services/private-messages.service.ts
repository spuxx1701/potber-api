import { Injectable, Logger } from '@nestjs/common';
import { PrivateMessageReadResource } from '../resources/private-message.read.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { EncodingService } from 'src/encoding/encoding.service';
import { SessionResource } from 'src/auth/resources/session.resource';
import { privateMessagesRegex } from '../config/private-messages.regex';
import { PrivateMessageFolder } from '../types';
import { UserResource } from 'src/users/resources/user.resource';

const INBOUND_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=1`;
const OUTBOUND_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=2`;
const SYSTEM_URL = `${forumConfig.FORUM_URL}pm/?a=0&cid=3`;

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

  async getInbound(
    session: SessionResource,
  ): Promise<PrivateMessageReadResource[]> {
    const { data } = await this.httpService.get(INBOUND_URL, {
      cookie: session.cookie,
    });
    return this.parseMessageList(data, session, PrivateMessageFolder.inbound);
  }

  /**
   * Parses the given message list html to a list of private message.
   * Only contains header data (title, sender/recipient and date).
   * @param html The HTML document.
   * @param folder The private message folder (inbound/outbound/system).
   * @returns The list of private messages.
   */
  parseMessageList(
    html: string,
    session: SessionResource,
    folder: PrivateMessageFolder,
  ): PrivateMessageReadResource[] {
    const messages: PrivateMessageReadResource[] = [];
    const unreadMatches = html.matchAll(privateMessagesRegex.list.unread);
    const readMatches = html.matchAll(privateMessagesRegex.list.read);
    const allMatches: RegExpMatchArray[] = [...unreadMatches, ...readMatches];
    for (const match of allMatches) {
      try {
        messages.push(this.parseMessageListItem(match[1], folder));
      } catch (error) {
        Logger.error(
          `An error occured while parsing a private message header for user '${session.username}' (${error.message}). The message will be skipped.`,
          this.constructor.name,
        );
      }
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
    const date = dateMatches[2];

    const message: PrivateMessageReadResource = { id, title, date };

    // Retrieving the sender/recipient may fail. If it does, we will assume
    // that 'System' is the sender/recipient.
    const recipientOrSenderIdMatches = html.match(
      privateMessagesRegex.list.recipientOrSenderId,
    );
    const recipientOrSenderNameMatches = html.match(
      privateMessagesRegex.list.recipientOrSenderName,
    );
    if (recipientOrSenderIdMatches && privateMessagesRegex) {
      if (folder === PrivateMessageFolder.inbound) {
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
}
