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
    description: 'The boards that belong to this board category.',
    example: [],
  })
  boards: BoardResource[];
}
