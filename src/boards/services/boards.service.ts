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
  async findOne(id: string, session: SessionResource, page?: number) {
    let url = `${ENDPOINT_URL}?BID=${id}`;
    if (page) url += `&page=${page}`;
    const { data } = await this.httpService.get(url, {
      cookie: session.cookie,
    });

    const xmlDocument = this.xmljs.parseXml(data);
    const board = this.transformBoard(xmlDocument.elements[0]);
    return board;
  }

  /**
   * Transforms a board.
   * @param boardXml The baord XML element.
   * @returns The board.
   */
  transformBoard(boardXml: Element): BoardResource {
    // Check whether board is invalid or we do not have access
    if (boardXml.name === 'invalid-board') {
      throw new NotFoundException();
    }
    if (boardXml.name === 'no-access') {
      throw new ForbiddenException();
    }
    let page: BoardPageResource | undefined;
    const threadsXml = this.xmljs.getElement('threads', boardXml);
    if (threadsXml) {
      // Check if the given page has posts and throw NotFound otherwise
      if (!threadsXml.elements) {
        throw new NotFoundException();
      }
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
