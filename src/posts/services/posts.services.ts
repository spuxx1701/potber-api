import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { UsersService } from 'src/users/services/users.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { postsExceptions } from '../config/posts.exceptions';
import { PostWriteResource } from '../resources/post.write.resource';
import { PostLinkResource } from '../resources/post.link.resource';
import { PostPreviewResource } from '../resources/post.preview.resource';
import { PostResource } from '../resources/post.resource';
import * as he from 'he';
import { ThreadsService } from 'src/threads/services/threads.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ThreadsService))
    private readonly threadsService: ThreadsService,
  ) {}

  /**
   * Wraps ThreadsService.findPost().
   * @param id The post id.
   * @param threadId The thread id.
   * @param session The session resource.
   * @returns The post.
   */
  async findOne(
    id: string,
    threadId: string,
    session: SessionResource,
    options?: {
      quote?: boolean;
    },
  ): Promise<PostResource> {
    return this.threadsService.findPost(threadId, id, session, options);
  }

  /**
   * Creates a new post and returns URLs and other information that lead to the newly created post.
   * @param post The post-create resource.
   * @param session The session object.
   * @returns URLs and other information that lead to the newly created post.
   */
  async create(
    post: PostWriteResource,
    session: SessionResource,
  ): Promise<PostResource> {
    Logger.log(
      `User '${session.username}' (${session.userId}) is attempting to create a new post in thread '${post.threadId}'.`,
      this.constructor.name,
    );
    const url = `${forumConfig.FORUM_URL}newreply.php?TID=${post.threadId}`;
    const token = await this.getSecurityToken(url, session);
    const payload = this.createFormBody('post', post, token);
    const { data } = await this.httpService.post(url, payload, {
      cookie: session.cookie,
    });
    const { id, threadId } = this.processCreateOrEditResponse(data);
    const result = await this.threadsService.findPost(threadId, id, session);
    Logger.log(
      `User '${session.username}' (${session.userId}) has created post '${result.id}' in thread '${result.threadId}'.`,
      this.constructor.name,
    );
    return result;
  }

  async update(
    id: string,
    post: PostWriteResource,
    session: SessionResource,
  ): Promise<PostResource> {
    Logger.log(
      `User '${session.username}' (${session.userId}) is attempting to edit post ${id} in thread '${post.threadId}'.`,
      this.constructor.name,
    );
    const url = `${forumConfig.FORUM_URL}editreply.php?PID=${id}`;
    const token = await this.getSecurityToken(url, session);
    const payload = this.createFormBody('edit', post, token);
    const { data } = await this.httpService.post(url, payload, {
      cookie: session.cookie,
    });
    const { threadId } = this.processCreateOrEditResponse(data);
    const result = await this.threadsService.findPost(threadId, id, session);
    Logger.log(
      `User '${session.username}' (${session.userId}) has edited post'${id}' in thread '${post.threadId}'.`,
      this.constructor.name,
    );
    return result;
  }

  /**
   * Creats a form body from the given post and other parameters.
   * @param post The post.
   * @param token The security token.
   * @returns The form body.
   */
  createFormBody(
    prefix: 'post' | 'edit',
    post: PostWriteResource,
    token: string,
  ): string {
    const keyValuePairs = [];
    keyValuePairs.push(`token=${token}`);
    keyValuePairs.push(
      `${prefix}_title=${post.title ? escape(post.title) : ''}`,
    );
    keyValuePairs.push(`${prefix}_icon=${post.icon ? post.icon : '0'}`);
    keyValuePairs.push(
      `message=${escape(
        he.encode(post.message, { allowUnsafeSymbols: true }),
      )}`,
    );
    keyValuePairs.push(`${prefix}_converturls=${post.convertUrls ? '1' : '0'}`);
    keyValuePairs.push(
      `${prefix}_disablebbcode=${post.disableBbCode ? '1' : '0'}`,
    );
    keyValuePairs.push(
      `${prefix}_disablesmilies=${post.disableEmojis ? '1' : '0'}`,
    );
    keyValuePairs.push(`submit=Eintragen`);
    return keyValuePairs.join('&');
  }

  /**
   * Fetches and returns the security token that is required to perform specific create or edit action.
   * @param uri The url (e.g. '.../newreply.php?TID=123' or '.../editreply.php?PID=123')
   * @returns The token.
   */
  async getSecurityToken(
    url: string,
    session: SessionResource,
  ): Promise<string> {
    const { data } = await this.httpService.get(url, {
      cookie: session.cookie,
    });
    if (/Keine Zutrittsberechtigung/.test(data)) {
      throw new ForbiddenException();
    } else if (/Dieser Thread ist versteckt/.test(data)) {
      throw postsExceptions.threadIsHidden;
    }
    const tokenMatches = data.match(/(?:(name='token'\svalue=')(.*?)('\s\/>))/);
    if (tokenMatches && tokenMatches.length >= 3) {
      return tokenMatches[2] as string;
    } else {
      throw new Error('Post action failed: Unable to retrieve security token.');
    }
  }

  /**
   * Checks the response text returned by the 'newreply.php' or 'editreply.php' endpoints for
   * signs of success and failure.
   * @param text The response text.
   * @returns .
   */
  processCreateOrEditResponse(text: string): PostLinkResource | null {
    if (/Antwort erstellt/.test(text) || /Antwort wurde editiert/.test(text)) {
      // Attempt to retrieve and return the post id
      const postIdMatches = text.match(/(?:(PID=)(\d*)(#))/);
      const threadIdMatches = text.match(/(?:(TID=)(\d*)(&))/);
      if (
        postIdMatches &&
        postIdMatches.length >= 3 &&
        threadIdMatches &&
        threadIdMatches.length >= 3
      ) {
        const id = postIdMatches[2] as string;
        const threadId = threadIdMatches[2] as string;
        return {
          id,
          threadId,
          url: `${process.env.APP_API_URL}/threads/${threadId}/posts/${id}`,
        } as PostLinkResource;
      } else return null;
    } else {
      if (new RegExp(/Du postest zu viel in zu kurzer Zeit/).test(text)) {
        throw postsExceptions.tooManyRequests;
      } else if (/Dieser Thread ist geschlossen/.test(text)) {
        throw postsExceptions.threadIsClosed;
      } else {
        throw postsExceptions.unknown;
      }
    }
  }

  /**
   * Transforms a post XML object.
   * @param postXml The post XML object.
   * @returns The post resource.
   */
  transformPost(postXml: Element) {
    const post = {
      id: this.xmljs.getAttribute('id', postXml),
      author: this.usersService.transformUser(
        this.xmljs.getElement('user', postXml),
      ),
      date: new Date(
        parseInt(
          this.xmljs.getAttribute(
            'timestamp',
            this.xmljs.getElement('date', postXml),
          ),
        ) * 1000,
      ),
      title: this.xmljs.getElementCdata(
        'title',
        this.xmljs.getElement('message', postXml),
      ),
      icon: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('icon', postXml),
      ),
      message: this.xmljs.getElementCdata(
        'content',
        this.xmljs.getElement('message', postXml),
      ),
      editedCount: parseInt(
        this.xmljs.getAttribute(
          'count',
          this.xmljs.getElement(
            'edited',
            this.xmljs.getElement('message', postXml),
          ),
        ),
      ),
      lastEdit: this.transformLastEdit(
        this.xmljs.getElement('message', postXml),
      ),
      threadId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-thread', postXml),
      ),
      boardId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-board', postXml),
      ),
      avatarUrl: this.xmljs.getElementCdata('avatar', postXml),
    } as PostResource;
    post.contentHidden = !post.message;
    if (post.message) post.message = unescape(he.decode(post.message));
    if (post.title) post.title = unescape(post.title);
    return post;
  }

  /**
   * Transforms s post preview XML object.
   * @param firstPostXml The post preview XML object.
   * @returns The post preview resource.
   */
  transformPostPreview(postPreviewXml: Element) {
    if (!postPreviewXml) return;
    const postXml = this.xmljs.getElement('post', postPreviewXml);
    return {
      author: this.usersService.transformUser(
        this.xmljs.getElement('user', postXml),
      ),
      date: new Date(
        parseInt(
          this.xmljs.getAttribute(
            'timestamp',
            this.xmljs.getElement('date', postXml),
          ),
        ) * 1000,
      ),
      icon: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('icon', postXml),
      ),
      threadId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-thread', postXml),
      ),
      boardId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-board', postXml),
      ),
    } as PostPreviewResource;
  }

  transformLastEdit(messageXml: Element) {
    const editedNode = this.xmljs.getElement('edited', messageXml);
    if (editedNode) {
      const lastEditNode = this.xmljs.getElement('lastedit', editedNode);
      if (lastEditNode) {
        return {
          user: this.usersService.transformUser(
            this.xmljs.getElement('user', lastEditNode),
          ),
          date: new Date(
            parseInt(
              this.xmljs.getAttribute(
                'timestamp',
                this.xmljs.getElement('date', lastEditNode),
              ),
            ) * 1000,
          ),
        };
      }
    }
    return undefined;
  }
}
