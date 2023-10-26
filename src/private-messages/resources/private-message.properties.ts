import { ApiOperationOptions, ApiPropertyOptions } from '@nestjs/swagger';

export const privateMessageProperties = {
  id: {
    description: "The private message's unique id.",
    example: '123456',
  } as ApiPropertyOptions,

  title: {
    description: "The private message's title (or subject).",
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
    examples: [true, false],
  } as ApiPropertyOptions,

  important: {
    description: 'Whether the private message has been flagged as important.',
    examples: [true, false],
  } as ApiPropertyOptions,

  recipient: {
    description:
      'The recipient of the private message. Only provided for outbound messages.',
    example: { id: '1268185', name: 'Ameisenfutter' },
  } as ApiPropertyOptions,

  recipientName: {
    description:
      'The recipient of the private message. Only the username is required when sending messages.',
    example: 'Ameisenfutter',
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

  saveCopy: {
    description:
      "Whether a copy of the message should be saved to the user's 'outbound' folder.",
    example: false,
  } as ApiOperationOptions,
};
