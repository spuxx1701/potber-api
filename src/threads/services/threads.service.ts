import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { PostReadResource } from 'src/posts/resources/post.read.resource';
import { PostsService } from 'src/posts/services/posts.services';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { ThreadReadResource } from '../resources/thread.read.resource';
import { ThreadPageResource } from '../resources/thread-page.resource';
import { EncodingService } from 'src/encoding/encoding.service';
import { ThreadCreateResource } from '../resources/thread.create.resource';
import { threadsExceptions } from '../config/threads.exceptions';

const ENDPOINT_URL = `${forumConfig.API_URL}thread.php`;

/**
 * The threads service class. Can return and transform threads, as well as create new threads.
 */
@Injectable()
export class ThreadsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly encodingService: EncodingService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  /**
   * Returns the thread for the given id and page. If page is not supplied, will return first page.
   * @param id The thread id.
   * @param session: The session object.
   * @param options (optional) More options.
   */
  async findById(
    id: string,
    session: SessionResource,
    options?: {
      postId?: string;
      page?: number;
      updateBookmark?: boolean;
    },
  ): Promise<ThreadReadResource> {
    let url = `${ENDPOINT_URL}?TID=${id}`;
    if (options?.postId) {
      url += `&PID=${options.postId}`;
    } else if (options?.page) {
      url += `&page=${options.page}`;
    }
    if (options?.updateBookmark) {
      url += `&update_bookmark=1`;
    }
    const { data } = await this.httpService.get(url, {
      cookie: session.cookie,
    });
    const threadXml = this.xmljs.parseXml(data);
    const thread = this.transformThread(threadXml.elements[0]);
    // If post id was specified, we need to check whether the thread page that we're returning actually
    // contains that post. If it doesn't, the thread doesn't contain a post with that post id and
    // we should raise a 404.
    if (
      options?.postId &&
      thread.page &&
      !thread.page.posts.find((post) => post.id === options.postId)
    ) {
      throw threadsExceptions.findById.notFound;
    }
    return thread;
  }

  /**
   * Returns the given post. Essentially wraps threadService.findById(), extracts the post and offers
   * some additional post-related functionality.
   * @param threadId
   * @param postId
   * @param session
   * @param options
   */
  async findPost(
    threadId: string,
    postId: string,
    session: SessionResource,
  ): Promise<PostReadResource> {
    // Since findById does all required checks, we can simply assume that we
    // receive the page and specific post at this point.
    const thread = await this.findById(threadId, session, { postId });
    const post = (thread.page as ThreadPageResource).posts.find(
      (post) => post.id === postId,
    ) as PostReadResource;
    return post;
  }

  /**
   * Transforms a thread XML object to a thread resource.
   * @param threadXml The thread XML object.
   * @returns The thread resource.
   */
  transformThread(threadXml: Element): ThreadReadResource {
    if (threadXml.name === 'invalid-thread') {
      throw threadsExceptions.findById.notFound;
    } else if (threadXml.name === 'no-access') {
      throw threadsExceptions.findById.forbidden;
    } else if (threadXml.name === 'thread-hidden') {
      throw threadsExceptions.findById.notFound;
    }
    const thread = {
      id: this.xmljs.getAttribute('id', threadXml),
      title: this.xmljs.getElementCdata('title', threadXml),
      subtitle: this.xmljs.getElementCdata('subtitle', threadXml),
      repliesCount: parseInt(
        this.xmljs.getAttribute(
          'value',
          this.xmljs.getElement('number-of-replies', threadXml),
        ),
      ),
      hitsCount: parseInt(
        this.xmljs.getAttribute(
          'value',
          this.xmljs.getElement('number-of-hits', threadXml),
        ),
      ),
      pagesCount: parseInt(
        this.xmljs.getAttribute(
          'value',
          this.xmljs.getElement('number-of-pages', threadXml),
        ),
      ),
      isClosed: this.getPostFlag('is-closed', threadXml),
      isSticky: this.getPostFlag('is-sticky', threadXml),
      isImportant: this.getPostFlag('is-important', threadXml),
      isAnnouncement: this.getPostFlag('is-announcement', threadXml),
      isGlobal: this.getPostFlag('is-global', threadXml),
      boardId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-board', threadXml),
      ),
      firstPost: this.postsService.transformPostPreview(
        this.xmljs.getElement('firstpost', threadXml),
      ),
      lastPost: this.postsService.transformPostPreview(
        this.xmljs.getElement('lastpost', threadXml),
      ),
      page: this.transformThreadPage(this.xmljs.getElement('posts', threadXml)),
    } as ThreadReadResource;
    if (thread.title)
      thread.title = this.encodingService.decodeText(thread.title);
    if (thread.subtitle)
      thread.subtitle = this.encodingService.decodeText(thread.subtitle);
    return thread;
  }

  /**
   * Transforms a thread page XML object to a thread page.
   * @param threadPageXml The thread page xml object.
   * @returns The thread page.
   */
  transformThreadPage(threadPageXml: Element) {
    if (!threadPageXml) return undefined;
    if (!threadPageXml.elements || threadPageXml.elements?.length === 0) {
      throw threadsExceptions.findById.notFound;
    }
    const posts: PostReadResource[] = [];
    for (const postXml of threadPageXml.elements) {
      posts.push(this.postsService.transformPost(postXml as Element));
    }
    return {
      number: parseInt(this.xmljs.getAttribute('page', threadPageXml)),
      offset: parseInt(this.xmljs.getAttribute('offset', threadPageXml)),
      postCount: parseInt(this.xmljs.getAttribute('count', threadPageXml)),
      posts,
    } as ThreadPageResource;
  }

  /**
   * Returns the given flag from the thread.
   * @param flag The flag (is-sticky, is-important etc.)
   * @param threadXml The thread xml object.
   * @returns The flag value or undefined.
   */
  getPostFlag(flag: string, threadXml: Element) {
    const flagsNode = this.xmljs.getElement('flags', threadXml);
    if (flagsNode && flagsNode.elements?.length > 0) {
      const flagElement = this.xmljs.getElement(flag, flagsNode);
      const flagValue = this.xmljs.getAttribute('value', flagElement);
      if (flagValue) return flagValue === '1';
    }
    return undefined;
  }

  /**
   * Creates a new thread. See: https://spuxx1701.github.io/mdexml/#newthread.php
   * @param thread The new thread and opening post.
   * @param session The session resource.
   */
  async create(
    thread: ThreadCreateResource,
    session: SessionResource,
  ): Promise<ThreadReadResource> {
    Logger.log(
      `User '${session.username}' (${session.userId}) is attempting to create a new thread in board '${thread.boardId}'.`,
      this.constructor.name,
    );

    const tokenUrl = `${forumConfig.FORUM_URL}newthread.php?BID=${thread.boardId}`;
    const token = await this.httpService.getSecurityToken(tokenUrl, session);

    const url = `${forumConfig.FORUM_URL}newthread.php`;
    const payload = this.httpService.createFormDataPayload(
      {
        BID: thread.boardId,
        token,
        thread_title: thread.title,
        thread_subtitle: thread.openingPost.title ?? '',
        thread_tags: thread.tags.length > 0 ? thread.tags.join('++') : '',
        thread_icon: thread.openingPost.icon ?? '0',
        message: thread.openingPost.message,
        thread_converturls: thread.openingPost.convertUrls ? '1' : '0',
        thread_disablebbcode: thread.openingPost.disableBbCode ? '1' : '0',
        thread_disablesmilies: thread.openingPost.disableEmojis ? '1' : '0',
        submit: 'Eintragen',
      },
      {
        encode: true,
        escapeHtml: true,
      },
    );

    const { data } = await this.httpService.post(url, payload, {
      cookie: session.cookie,
    });

    const threadId = this.getNewThreadId(data);
    const createdThread = await this.findById(threadId, session);

    Logger.log(
      `User '${session.username}' (${session.userId}) has created thread '${createdThread.id}' in board '${createdThread.boardId}'.`,
      this.constructor.name,
    );

    return createdThread;
  }

  private getNewThreadId(html: string): string {
    if (html.includes('Du postest zu viel in zu kurzer Zeit')) {
      throw threadsExceptions.create.tooManyRequests;
    }
    const threadIdRegex = /thread\.php\?TID=(\d*)/i;
    const threadIdMatches = html.match(threadIdRegex);
    const threadId = threadIdMatches[1];
    return threadId;
  }
}
