import { Injectable } from '@nestjs/common';
import { PostResource } from 'src/posts/resources/post.resource';
import { PostsService } from 'src/posts/services/posts.services';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { ThreadPage, ThreadResource } from '../resources/thread.resource';

@Injectable()
export class ThreadsService {
  constructor(
    private readonly xmljs: XmlJsService,
    private readonly postsService: PostsService,
  ) {}

  transformThread(threadXml: Element) {
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
      firstPost: this.postsService.transformFirstPost(
        this.xmljs.getElement('firstpost', threadXml),
      ),
      lastPost: this.postsService.transformLastPost(
        this.xmljs.getElement('lastpost', threadXml),
      ),
      page: this.transformThreadPage(this.xmljs.getElement('posts', threadXml)),
    } as ThreadResource;
    return thread;
  }

  transformThreadPage(threadPageXml: Element) {
    if (!threadPageXml) return undefined;
    const posts: PostResource[] = [];
    for (const postXml of threadPageXml.elements) {
      posts.push(this.postsService.transformPost(postXml as Element));
    }
    return {
      number: parseInt(this.xmljs.getAttribute('page', threadPageXml)),
      offset: parseInt(this.xmljs.getAttribute('offset', threadPageXml)),
      postCount: parseInt(this.xmljs.getAttribute('count', threadPageXml)),
      posts,
    } as ThreadPage;
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
