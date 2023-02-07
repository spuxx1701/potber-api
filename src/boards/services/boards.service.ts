import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { ThreadsService } from 'src/threads/services/threads.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { BoardPageResource, BoardResource } from '../resources/board.resource';

const ENDPOINT_URL = `${forumConfig.API_URL}board.php`;

@Injectable()
export class BoardsService {
  constructor(
    private readonly xmljs: XmlJsService,
    private readonly httpService: HttpService,
    private readonly threadsService: ThreadsService,
  ) {}

  /**
   * Returns a board.
   * @param id The board's ID.
   * @param session The session.
   */
  async findOne(id: string, session: SessionResource) {
    const { data } = await this.httpService.get(`${ENDPOINT_URL}?BID=${id}`, {
      cookie: session.boardSessionCookie,
    });
    const xmlDocument = this.xmljs.parseXml(data);
    const boardCategories = this.transformBoard(xmlDocument);
    return boardCategories;
  }

  /**
   * Transforms a board.
   * @param boardXml The baord XML element.
   * @returns The board.
   */
  transformBoard(boardXml: Element): BoardResource {
    // Check whether board is invalid or we do not have access
    if (this.xmljs.getElement('invalid-board', boardXml)) {
      throw new NotFoundException();
    }
    if (boardXml.name === 'no-access') {
      throw new ForbiddenException();
    }
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
