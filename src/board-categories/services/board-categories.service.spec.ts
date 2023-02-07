import { Test } from '@nestjs/testing';
import { BoardsModule } from 'src/boards/boards.module';
import HttpModule from 'src/http/http.module';
import XmlTransformerService from 'src/xml-api/xml-transformer.service';
import BoardCategoryResource from '../resources/board-category.resource';
import BoardCategoriesService from './board-categories.service';
import { boardXmlMockData } from './board-categories.service.spec.includes';

describe('BoardCategories | BoardCategoriesService', () => {
  let boardCategoriesService: BoardCategoriesService;
  let xmlTransformer: XmlTransformerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, BoardsModule],
      providers: [XmlTransformerService, BoardCategoriesService],
    }).compile();
    xmlTransformer = await moduleRef.resolve(XmlTransformerService);
    boardCategoriesService = await moduleRef.resolve(BoardCategoriesService);
  });

  describe('transformBoardOverview', () => {
    it("Should transform the board overview from 'boards.php' endpoint.", () => {
      const actual = boardCategoriesService.transformBoardOverview(
        xmlTransformer.parseXml(boardXmlMockData.full),
      );
      const expected: BoardCategoryResource[] = [
        {
          id: '6',
          name: 'Allgemeines',
          description: 'SeitenÃŒbergreifende Themen',
          boards: [
            {
              id: '95',
              name: '3DSupply.de',
              description: 'Alles rund um 3D Supply',
              threadsCount: 0,
              repliesCount: 0,
              categoryId: '6',
              page: undefined,
            },
            {
              id: '14',
              name: 'Public Offtopic',
              description:
                'fÃŒr das was nicht passt und sonstige geistige HÃ¶henflÃŒge',
              threadsCount: 46587,
              repliesCount: 13987787,
              categoryId: '6',
              page: undefined,
            },
          ],
        },
        {
          id: '7',
          name: 'Counter-Strike / Half-Life 2',
          description: 'Alles rund um Valves Spiele',
          boards: [
            {
              id: '18',
              name: 'Hauptforum',
              description: 'Alles rund ums Thema Counter-Strike!',
              threadsCount: 11771,
              repliesCount: 133645,
              categoryId: '7',
              page: undefined,
            },
          ],
        },
      ];
      expect(actual).toEqual(expected);
    });
  });
});
