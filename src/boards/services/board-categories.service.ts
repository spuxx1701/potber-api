import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import SessionResource from 'src/auth/resources/session.resource';
import { forumConfig } from 'src/config/forum.config';
import XmlTransformerService from 'src/xml-api/xml-transformer.service';
import BoardCategoryResource from '../resources/board-category.resource';
import BoardResource from '../resources/board.resource';

const ENDPOINT_URL = `${forumConfig.API_URL}boards.php`;

@Injectable()
export default class BoardCategoriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmlTransformerService: XmlTransformerService,
  ) {}

  /**
   * Retrieves all board categories.
   * @param session The session object.
   */
  async findAll(session: SessionResource): Promise<BoardCategoryResource[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(ENDPOINT_URL, {
          headers: {
            Cookie: session.boardSessionCookie,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(`Unable to retrieve board categories: ${error}`);
          }),
        ),
    );
    const xmlDocument = this.xmlTransformerService.parseXml(data);
    const boardCategories = this.transformBoardOverview(xmlDocument);
    return boardCategories;
  }

  /**
   * Transforms the result of the 'boards.php' endpoint and returns an array
   * of baord categories.
   * @param xmlDocument The xml document.
   * @returns The board categories.
   */
  transformBoardOverview(xmlDocument: XMLDocument) {
    const boardCategoriesXml = this.xmlTransformerService.getNode(
      'categories',
      xmlDocument,
    ) as Element;
    const boardCategories: BoardCategoryResource[] = [];
    for (let i = 0; i < boardCategoriesXml.childNodes.length; i++) {
      const boardCategoryXml = boardCategoriesXml.childNodes[i];
      const boards: BoardResource[] = [];
      const boardsNode = this.xmlTransformerService.getNode(
        'boards',
        boardCategoryXml,
      );
      if (boardsNode) {
        for (let ii = 0; ii < boardsNode.childNodes.length; ii++) {
          const boardNode = boardsNode.childNodes[i];
          boards.push({});
          // TODO: Implement boards
          // boards.push(this.transformBoardOverview(boardCategoryItemXml));
        }
      }
      boardCategories.push({
        id: this.xmlTransformerService.getAttributeValue(
          'id',
          boardCategoryXml,
        ),
        name: this.xmlTransformerService.getNodeTextContent(
          'name',
          boardCategoryXml,
        ),
        description: this.xmlTransformerService.getNodeTextContent(
          'description',
          boardCategoryXml,
        ),
        boards,
      } as BoardCategoryResource);
    }
    return boardCategories;
  }
}
