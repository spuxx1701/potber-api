import { ApiPropertyOptions } from '@nestjs/swagger';

export const postProperties = {
  id: {
    description: "The post's unique id.",
    example: '1249813752',
  } as ApiPropertyOptions,

  author: {
    description: "The post's author.",
    example: {
      id: '1268185',
      groupId: '3',
      name: 'Ameisenfutter',
    },
  } as ApiPropertyOptions,

  date: {
    description: 'The creation timestamp of the post.',
    example: '2023-01-14T21:44:01.000Z',
  } as ApiPropertyOptions,

  threadId: {
    description: 'The thread this post belongs to.',
    example: '219289',
  } as ApiPropertyOptions,

  boardId: {
    description: 'The boad this post belongs to.',
    example: '14',
  } as ApiPropertyOptions,

  title: {
    description: "The post's title. Can be empty.",
    required: false,
    example: 'Hallo!',
  } as ApiPropertyOptions,

  icon: {
    description: "The post's icon. Empty or '0' means no icon.",
    required: false,
    example: '37',
  } as ApiPropertyOptions,

  message: {
    description:
      'The post message. Will be undefined if the message was hidden by a moderator.',
    example: 'Geposted mit potber-api! ❤',
  } as ApiPropertyOptions,

  contentHidden: {
    description:
      'Whether the post content (icon, title and message) was hidden by a moderator.',
    example: false,
  } as ApiPropertyOptions,

  editedCount: {
    description: 'How often the post has been edited.',
    example: 3,
  } as ApiPropertyOptions,

  lastEdit: {
    description: 'When the post was edited last and by who.',
    example: {
      user: {
        id: '1268185',
        name: 'Ameisenfutter',
      },
      date: '2023-02-08T20:04:18.000Z',
    },
  } as ApiPropertyOptions,

  avatarUrl: {
    description: "The post author's avatar URL.",
    example: './avatare/upload/U1268185--small.png',
  } as ApiPropertyOptions,

  convertUrls: {
    description: 'Whether URLs should be converted to URL tags automatically.',
    default: true,
  } as ApiPropertyOptions,

  disableBbCode: {
    description:
      'Whether BBCode should not be used. If set to true, BBCode tags will be displayed as plain text.',
    default: false,
  } as ApiPropertyOptions,

  disableEmojis: {
    description:
      'Whether emojis should not be converted automatically. If set to true, emojis will be displayed as plain text.',
    default: false,
  } as ApiPropertyOptions,

  url: {
    description: "The post's API resource URL.",
    example: 'https://api.potber.de/threads/219289/posts/1249813752',
  },
};
