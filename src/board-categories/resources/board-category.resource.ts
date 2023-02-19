import { ApiProperty } from '@nestjs/swagger';
import { BoardResource } from 'src/boards/resources/board.resource';

export class BoardCategoryResource {
  @ApiProperty({
    description: "The board category's id.",
    example: '6',
  })
  id: string;

  @ApiProperty({
    description: "The board category's name.",
    example: 'Allgemeines',
  })
  name: string;

  @ApiProperty({
    description: "The board category's description.",
    example: 'Seitenübergreifende Themen',
  })
  description: string;

  @ApiProperty({
    description: 'The boards in this board category.',
    example: [
      {
        id: '14',
        name: 'Public Offtopic',
        description: 'für das was nicht passt und sonstige geistige Höhenflüge',
        threadsCount: 46604,
        repliesCount: 14000835,
        categoryId: '6',
        moderators: [
          {
            id: '5652',
            name: 'Atomsk',
          },
          {
            id: '1157313',
            name: 'Irdorath',
          },
          {
            id: '27923',
            name: 'statixx',
          },
          {
            id: '1279561',
            name: 'Teh Wizard of Aiz',
          },
        ],
      },
      {
        id: '16',
        name: 'Offtopic- und Funforum',
        description: 'legendär elitär',
        threadsCount: 402,
        repliesCount: 39280,
        categoryId: '6',
        moderators: [
          {
            id: '2822',
            name: 'Insaniac',
          },
          {
            id: '52461',
            name: 'Wahooka',
          },
        ],
      },
    ],
  })
  boards: BoardResource[];
}
