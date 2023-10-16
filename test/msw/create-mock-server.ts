import { RequestHandler } from 'msw';
import { setupServer } from 'msw/node';

export const createMockServer = (requestHandlers?: RequestHandler<any>[]) => {
  const mockServer = setupServer(...requestHandlers);
  mockServer.listen({
    onUnhandledRequest: (req: any, print: any) => {
      // Don't handle internal requests to Nest
      if (
        req.url.hostname === '127.0.0.1' ||
        req.url.hostname === 'localhost'
      ) {
        return;
      }
      // Disallow all other unhandled requests
      print.error();
    },
  });
  return mockServer;
};
