import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { PostResource } from 'src/posts/resources/post.resource';
import { PostsService } from 'src/posts/services/posts.services';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { ThreadResource } from '../resources/thread.resource';
import { ThreadPageResource } from '../resources/thread-page.resource';
// import { PostWriteResource } from 'src/posts/resources/post.write.resource';
// import { PostLinkResource } from 'src/posts/resources/post.link.resource';

const ENDPOINT_URL = `${forumConfig.API_URL}thread.php`;

/**
 * The threads service class. Can return and transform threads, as well as create new threads.
 */
@Injectable()
export class ThreadsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  /**
   * Returns the thread for the given id and page. If page is not supplied, will return first page.
   * @param id The thread id.
   * @param session: The session object.
   * @param options (optional) More options.
   */
  async findOne(
    id: string,
    session: SessionResource,
    options?: {
      postId?: string;
      page?: number;
      updateBookmark?: boolean;
    },
  ): Promise<ThreadResource> {
    let url = `${ENDPOINT_URL}?TID=${id}`;
    if (options?.postId) {
      url += `&PID=${options.postId}`;
    } else if (options.page) {
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
      throw new NotFoundException();
    }
    return thread;
  }

  /**
   * Returns the given post. Essentially wraps threadService.findOne(), extracts the post and offers
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
    options?: { quote?: boolean },
  ): Promise<PostResource> {
    // Since findOne does all required checks, we can simply assume that we
    // receive the page and specific post at this point.
    const thread = await this.findOne(threadId, session, { postId });
    const post = (thread.page as ThreadPageResource).posts.find(
      (post) => post.id === postId,
    ) as PostResource;
    if (options?.quote) {
      post.message = `[quote=${post.author.id},${post.id},"${post.author.name}"][b]${post.message}[/b][/quote]"`;
    }
    return post;
  }

  // /**
  //  * Wraps PostsService.create().
  //  * @param post The post-create resource.
  //  * @param session The session object.
  //  * @returns The created post.
  //  */
  // async createPost(
  //   post: PostWriteResource,
  //   session: SessionResource,
  // ): Promise<PostResource> {
  //   return this.postsService.create(post, session);
  // }

  /**
   * Transforms a thread XML object to a thread resource.
   * @param threadXml The thread XML object.
   * @returns The thread resource.
   */
  transformThread(threadXml: Element): ThreadResource {
    if (threadXml.name === 'invalid-thread') {
      throw new NotFoundException();
    } else if (threadXml.name === 'no-access') {
      throw new ForbiddenException();
    } else if (threadXml.name === 'thread-hidden') {
      throw new NotFoundException();
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
    } as ThreadResource;
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
      throw new NotFoundException();
    }
    const posts: PostResource[] = [];
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
}
