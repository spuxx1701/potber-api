import { ApiProperty } from '@nestjs/swagger';
import UserResource from 'src/users/resources/user.resource';

export default class PostResource {
  @ApiProperty({
    description: "The post's unique ID.",
  })
  id: string;

  @ApiProperty({
    description: "The post's author.",
  })
  author: UserResource;

  @ApiProperty({
    description: 'The creation timestamp of the post.',
  })
  date: Date;

  @ApiProperty({
    description: 'The thread this post belongs to.',
  })
  threadId: string;

  @ApiProperty({
    description: 'The boad this post belongs to.',
  })
  boardId: string;

  @ApiProperty({
    description: "The post's title.",
  })
  title?: string;

  @ApiProperty({
    description: "The post's icon. '0' means no icon.",
  })
  icon?: string;

  @ApiProperty({
    description: 'The post content.',
  })
  content: string;

  @ApiProperty({
    description: 'How often the post has been edited.',
  })
  editedCount: number;

  @ApiProperty({
    description: 'When the post was edited last and by who.',
  })
  lastEdit?: {
    user: UserResource;
    date: Date;
  };

  @ApiProperty({
    description: "The post author's avatar URL.",
  })
  avatarUrl?: string;
}
