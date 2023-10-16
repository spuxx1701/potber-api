import { SessionResource } from 'src/auth/resources/session.resource';

export const defaultMockSession: SessionResource = {
  username: 'MockUser',
  userId: '0',
  avatarUrl: 'mock-user-avatar-url',
  cookie: 'mock-session-cookie',
  iat: Date.now() / 1000 - 1800,
  exp: Date.now() / 1000 + 1800,
};
