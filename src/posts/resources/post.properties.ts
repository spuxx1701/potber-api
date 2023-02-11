import { ApiPropertyOptions } from '@nestjs/swagger';

export const postProperties = {
  id: {
    description: "The post's unique id.",
  } as ApiPropertyOptions,
  author: {
    description: "The post's author.",
  } as ApiPropertyOptions,
  date: {
    description: 'The creation timestamp of the post.',
  } as ApiPropertyOptions,
  threadId: {
    description: 'The thread this post belongs to.',
  } as ApiPropertyOptions,
  boardId: {
    description: 'The boad this post belongs to.',
  } as ApiPropertyOptions,
  title: {
    description: "The post's title. Can be empty.",
    required: false,
    example: 'Hello World!',
  } as ApiPropertyOptions,
  icon: {
    description: "The post's icon. Empty or '0' means no icon.",
    required: false,
    example: '0',
  } as ApiPropertyOptions,
  content: {
    description: 'The post content.',
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  } as ApiPropertyOptions,
  editedCount: {
    description: 'How often the post has been edited.',
  } as ApiPropertyOptions,
  lastEdit: {
    description: 'When the post was edited last and by who.',
  } as ApiPropertyOptions,
  avatarUrl: {
    description: "The post author's avatar URL.",
  } as ApiPropertyOptions,
};
