import { SessionResource } from 'src/auth/resources/session.resource';

export const defaultMockSession: SessionResource = {
  username: 'MockUser',
  userId: '123',
  avatarUrl: 'mock-user-avatar-url',
  cookie: 'mock-session-cookie',
};
