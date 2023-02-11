import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { UsersService } from 'src/users/services/users.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { threadId } from 'worker_threads';
import { postsExceptions } from '../config/posts.exceptions';
import { PostCreateResource } from '../resources/post.create.resource';
import { PostLinkResource } from '../resources/post.link.resource';
import { PostPreviewResource } from '../resources/post.preview.resource';
import { PostResource } from '../resources/post.resource';
import * as he from 'he';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Creates a new post and returns URLs and other information that lead to the newly created post.
   * @param post The post-create resource.
   * @param session The session object.
   * @returns URLs and other information that lead to the newly created post.
   */
  async create(
    post: PostCreateResource,
    session: SessionResource,
  ): Promise<PostLinkResource> {
    Logger.log(
      `User '${session.username}' (${session.userId}) is attempting to create a new post in thread '${post.threadId}'.`,
      this.constructor.name,
    );
    const url = `${forumConfig.FORUM_URL}/newreply.php?TID=${post.threadId}`;
    const token = await this.getSecurityToken(url, session);
    const payload = this.createFormBody(post, token);
    const { data } = await this.httpService.post(url, payload, {
      cookie: session.cookie,
    });
    const id = this.processCreateOrEditResponse(data);
    const result: PostLinkResource = {
      id,
      threadId: post.threadId,
      url: `${process.env.APP_API_URL}/threads/${threadId}/posts/${id}`,
    };
    Logger.log(
      `User '${session.username}' (${session.userId}) has created post'${id}' in thread '${post.threadId}'.`,
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
  createFormBody(post: PostCreateResource, token: string): string {
    const keyValuePairs = [];
    let prefix: string | undefined;
    // Form body needs to be prepared slightly differently for 'create' and 'edit' actions.
    if (post instanceof PostCreateResource) {
      prefix = 'post';
      keyValuePairs.push(`TID=${post.threadId}`);
      keyValuePairs.push(`token=${token}`);
      // } else if (post instanceof EditCreateResource) {
      //   prefix = 'edit';
      //   keyValuePairs.push(
      //     `token=${this.getSecurityToken(`/newreply.php?TID=${post.postId}`)}`,
      //   );
    } else {
      throw new Error(
        'Post must be an instance of either PostCreateResource or EditCreateResource.',
      );
    }
    keyValuePairs.push(`${prefix}_title=${post.title ? post.title : ''}`);
    keyValuePairs.push(`${prefix}_icon=${post.icon ? post.icon : '0'}`);
    keyValuePairs.push(`message=${escape(he.encode(post.message))}`);
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
    if (/Keine\sZutrittsberechtigung/.test(data)) {
      throw new ForbiddenException();
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
   * @returns The post id.
   */
  processCreateOrEditResponse(text: string): string | null {
    if (new RegExp(/Antwort erstellt/).test(text)) {
      // Attempt to retrieve and return the post id
      const postIdMatches = text.match(/(?:(PID=)(\d*)(#))/);
      if (postIdMatches && postIdMatches.length >= 3) {
        return postIdMatches[2] as string;
      } else return null;
    } else if (new RegExp(/Antwort wurde editiert/).test(text)) {
      return 'yolo';
    } else {
      if (new RegExp(/Du postest zu viel in zu kurzer Zeit/).test(text)) {
        throw postsExceptions.tooManyRequests;
      } else if (/Dieser Thread ist geschlossen/) {
        throw postsExceptions.threadIsClosed;
      } else {
        debugger;
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
