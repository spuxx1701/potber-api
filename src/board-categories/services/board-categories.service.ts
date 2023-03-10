import { Injectable } from '@nestjs/common';
import { SessionResource } from 'src/auth/resources/session.resource';
import { BoardResource } from 'src/boards/resources/board.resource';
import { BoardsService } from 'src/boards/services/boards.service';
import { forumConfig } from 'src/config/forum.config';
import { HttpService } from 'src/http/http.service';
import { Element, XmlJsService } from 'src/xml-api/xml-js.service';
import { BoardCategoryResource } from '../resources/board-category.resource';

const ENDPOINT_URL = `${forumConfig.API_URL}boards.php`;

/**
 * Board categories service class. Can transform and return the board overview and board categories.
 */
@Injectable()
export class BoardCategoriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmljs: XmlJsService,
    private readonly boardsService: BoardsService,
  ) {}

  /**
   * Retrieves all board categories.
   * @param session The session object.
   */
  async findAll(session: SessionResource): Promise<BoardCategoryResource[]> {
    const { data } = await this.httpService.get(ENDPOINT_URL, {
      cookie: session.cookie,
    });
    const xmlDocument = this.xmljs.parseXml(data);
    const boardCategories = this.transformBoardOverview(xmlDocument);
    return boardCategories;
  }

  /**
   * Transforms the result of the 'boards.php' endpoint and returns an array
   * of baord categories.
   * @param xmlDocument The xml document.
   * @returns The board categories.
   */
  transformBoardOverview(boardOverviewXml: Element) {
    const boardCategoriesXml = this.xmljs.getElement(
      'categories',
      boardOverviewXml,
    );
    const boardCategories: BoardCategoryResource[] = [];
    for (const boardCategoryXml of boardCategoriesXml.elements) {
      const boards: BoardResource[] = [];
      const boardsElement = this.xmljs.getElement('boards', boardCategoryXml);
      if (boardsElement && boardsElement.elements) {
        for (const boardElement of boardsElement.elements) {
          boards.push(this.boardsService.transformBoard(boardElement));
        }
      }
      boardCategories.push({
        id: this.xmljs.getAttribute('id', boardCategoryXml),
        name: this.xmljs.getElementCdata('name', boardCategoryXml),
        description: this.xmljs.getElementCdata(
          'description',
          boardCategoryXml,
        ),
        boards,
      } as BoardCategoryResource);
    }
    return boardCategories;
  }
}
