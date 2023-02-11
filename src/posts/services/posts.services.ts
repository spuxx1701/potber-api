import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { PostPreviewResource } from '../resources/post.preview.resource';
import { PostResource } from '../resources/post.resource';

@Injectable()
export class PostsService {
  constructor(
    private readonly xmljs: XmlJsService,
    private readonly usersService: UsersService,
  ) {}

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
      content: this.xmljs.getElementCdata(
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
  transformPostPreview(firstPostXml: Element) {
    const postXml = this.xmljs.getElement('post', firstPostXml);
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
