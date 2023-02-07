import { Injectable } from '@nestjs/common';
import ThreadsService from 'src/threads/services/threads.service';
import XmlJsService, { Element } from 'src/xml-api/xml-js.service';
import BoardResource, { BoardPageResource } from '../resources/board.resource';

@Injectable()
export default class BoardsService {
  constructor(
    private readonly xmljs: XmlJsService,
    private readonly threadsService: ThreadsService,
  ) {}

  transformBoard(boardXml: Element): BoardResource {
    // Check whether board is invalid or we do not have access
    if (
      this.xmljs.getElement('invalid-board', boardXml) ||
      boardXml.name === 'no-access'
    )
      return undefined;
    let page: BoardPageResource | undefined;
    const threadsXml = this.xmljs.getElement('threads', boardXml);
    if (threadsXml) {
      page = {
        number: parseInt(this.xmljs.getAttribute('page', threadsXml)),
        stickiesCount: parseInt(
          this.xmljs.getAttribute('with-stickies', threadsXml),
        ),
        globalsCount: parseInt(
          this.xmljs.getAttribute('with-globals', threadsXml),
        ),
        threadsCount: parseInt(this.xmljs.getAttribute('count', threadsXml)),
        threads: [],
      };
      for (const threadXml of threadsXml.elements) {
        page.threads.push(this.threadsService.transformThread(threadXml));
      }
    }
    const board = {
      id: this.xmljs.getAttribute('id', boardXml),
      name: this.xmljs.getElementCdata('name', boardXml),
      description: this.xmljs.getElementCdata('description', boardXml),
      threadsCount: parseInt(
        this.xmljs.getAttribute(
          'value',
          this.xmljs.getElement('number-of-threads', boardXml),
        ),
      ),
      repliesCount: parseInt(
        this.xmljs.getAttribute(
          'value',
          this.xmljs.getElement('number-of-replies', boardXml),
        ),
      ),
      categoryId: this.xmljs.getAttribute(
        'id',
        this.xmljs.getElement('in-category', boardXml),
      ),
      page,
    } as BoardResource;
    return board;
  }
}
