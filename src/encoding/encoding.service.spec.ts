import { Test } from '@nestjs/testing';
import { EncodingService } from './encoding.service';

describe('Encoding | EncodingService', () => {
  let encodingService: EncodingService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [EncodingService],
    }).compile();
    encodingService = await moduleRef.resolve(EncodingService);
  });

  describe('encodeLoginCredentials', () => {
    it('should properly output a username that does not require encoding', () => {
      const username = 'Ameisenfutter';
      const expected = 'Ameisenfutter';
      expect(encodingService.encodeLoginCredentials(username)).toStrictEqual(
        expected,
      );
    });

    it('should properly convert a username that does require encoding', () => {
      const username = '[potber]äöü²';
      const expected = '%5Bpotber%5D%E4%F6%FC%B2';
      expect(encodingService.encodeLoginCredentials(username)).toStrictEqual(
        expected,
      );
    });
  });

  describe('encodeText', () => {
    it('should properly encode a string that does not contain any special characters', () => {
      const input = 'Hello World';
      const expected = 'Hello World';
      expect(encodingService.encodeText(input)).toStrictEqual(expected);
    });

    it('should properly encode a string that does contain special characters', () => {
      const input = '[potber] äöü² 🦁 &#129409; lorem ipsum';
      const expected =
        '[potber] %E4%F6%FC%B2 %26%23129409%3B &#129409; lorem ipsum';
      expect(encodingService.encodeText(input)).toStrictEqual(expected);
    });
  });

  describe('decodeText', () => {
    it('should properly decode a string containing special characters', () => {
      const input = '[potber]&auml;&ouml;&uuml;&sup2;&#129409;';
      const expected = '[potber]äöü²🦁';
      expect(encodingService.decodeText(input)).toStrictEqual(expected);
    });
  });
});
