import { readFileSync } from 'fs';

/**
 * Helper function to read text files. Useful for importing mock XML/HTML files.
 * @param path The path to read from. Must be relative to the `handlers` directory.
 */
export const readHandlerMockFile = (path: string) => {
  const text = readFileSync(`test/msw/handlers/${path}`, 'utf8');
  return text;
};
