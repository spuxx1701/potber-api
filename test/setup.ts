import { TestContainer } from './container/test-container';

afterEach(() => {
  TestContainer.destroy();
  jest.resetAllMocks();
});
