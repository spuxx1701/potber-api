import { createTestContainer } from 'test/container';
import { HttpService } from './http.service';
import { HttpModule } from './http.module';

describe('Http | HttpService', () => {
  let service: HttpService;

  beforeEach(async () => {
    const container = await createTestContainer({
      imports: [HttpModule],
    });
    service = container.module.get<HttpService>(HttpService);
  });

  describe('createFormDataPayload', () => {
    it('should correctly create the payload string', () => {
      const data = {
        foo: 'bar',
        sentence: 'hello world',
        empty: undefined,
        number: 123,
      };
      const expected = 'foo=bar&sentence=hello world&empty=&number=123';
      expect(service.createFormDataPayload(data)).toBe(expected);
    });

    it('should correctly create and encode the payload string', () => {
      const data = {
        username: '[potber]äöü²',
        emoji: '🥳',
      };
      const expected = 'username=[potber]%E4%F6%FC%B2&emoji=%26%23129395%3B';
      expect(service.createFormDataPayload(data, { encode: true })).toBe(
        expected,
      );
    });
  });
});
