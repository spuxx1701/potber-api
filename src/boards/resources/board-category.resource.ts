import { ApiProperty } from '@nestjs/swagger';
import Board from './board.resource';

export default class BoardCategory {
  @ApiProperty({
    description: "The board category's ID.",
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
  boards: Board[];
}
