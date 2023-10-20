import { TestContainer } from './container/test-container';
import * as crypto from 'crypto';

beforeAll(() => {
  // Create a randomly-generated temporary secret for testing purposes
  process.env.AUTH_JWT_SECRET = crypto.randomUUID();
});

afterEach(() => {
  TestContainer.destroy();
  jest.resetAllMocks();
});
