import { validateSession } from './jwt.strategy';
import { SessionResource } from '../resources/session.resource';

describe('Auth | JwtStrategy', () => {
  describe('validate', () => {
    test('should pass validation', () => {
      const session: Partial<SessionResource> = {
        userId: '123',
        username: 'User',
        cookie: 'bar',
        exp: Date.now() / 1000 + 1000,
      };
      expect(validateSession(session as SessionResource)).toStrictEqual(
        session,
      );
    });

    test('should fail validation due to missing cookie', () => {
      const session: Partial<SessionResource> = {
        userId: '123',
        cookie: undefined,
      };
      expect(() => {
        validateSession(session as SessionResource);
      }).toThrow();
    });

    test('should fail validation due session being expired', () => {
      const session: Partial<SessionResource> = {
        userId: '123',
        cookie: 'foo',
        exp: Date.now() / 1000 - 1000,
      };
      expect(() => {
        validateSession(session as SessionResource);
      }).toThrow();
    });
  });
});
