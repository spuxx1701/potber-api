import { ApiPropertyOptions } from '@nestjs/swagger';

export const privateMessageProperties = {
  id: {
    description: "The private message's unique id.",
    example: '123456',
  } as ApiPropertyOptions,

  title: {
    description: "The private message's title.",
    example: 'Hello world!',
  } as ApiPropertyOptions,

  date: {
    description: 'The creation date of the message. Timezone is CET/CEST.',
    example: '07:54 12.1.2023',
  } as ApiPropertyOptions,

  folder: {
    description:
      "The folder this private message is in. Can be 'inbound', 'outbound' or 'system'.",
    examples: ['inbound', 'outbound', 'system'],
  } as ApiPropertyOptions,

  unread: {
    description: 'Whether the private message has not yet been read.',
    examples: [true, false, undefined],
  } as ApiPropertyOptions,

  recipient: {
    description:
      'The recipient of the private message. Only provided for outbound messages.',
    example: { id: '1268185', name: 'Ameisenfutter' },
  } as ApiPropertyOptions,

  sender: {
    description:
      'The sender of the private message. Only provided for inbound messages.',
    example: { id: '1268185', name: 'Ameisenfutter' },
  } as ApiPropertyOptions,

  content: {
    description: 'The content of the private message.',
    example: 'Hello world!',
  } as ApiPropertyOptions,
};
