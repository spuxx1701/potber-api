import { rest } from 'msw';
import { forumConfig } from 'src/config/forum.config';
import { readHandlerMockFile } from 'test/helpers/test-utils';
import { parseFormData } from 'test/msw/parse-form-data';

export const threadsHandlers = {
  create: {
    success: [
      rest.get(`${forumConfig.FORUM_URL}newthread.php`, (req, res, ctx) => {
        if (!req.url.searchParams.get('BID')) return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(readHandlerMockFile('threads/create/token.html')),
        );
      }),
      rest.post(
        `${forumConfig.FORUM_URL}newthread.php`,
        async (req, res, ctx) => {
          const body = await parseFormData(req);
          if (!body['BID']) {
            return res(
              ctx.status(200),
              ctx.text(
                readHandlerMockFile('threads/create/missing-board-id.html'),
              ),
            );
          } else if (!body['thread_title']) {
            return res(
              ctx.status(200),
              ctx.text(
                readHandlerMockFile('threads/create/missing-title.html'),
              ),
            );
          } else if (!body['message']) {
            return res(
              ctx.status(200),
              ctx.text(
                readHandlerMockFile('threads/create/missing-message.html'),
              ),
            );
          } else {
            return res(
              ctx.status(200),
              ctx.text(readHandlerMockFile('threads/create/success.html')),
            );
          }
        },
      ),
      rest.get(`${forumConfig.API_URL}thread.php`, (req, res, ctx) => {
        if (!req.url.searchParams.get('TID')) return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(readHandlerMockFile('threads/create/thread.xml')),
        );
      }),
    ],
    forbidden: [
      rest.get(`${forumConfig.FORUM_URL}newthread.php`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.text(readHandlerMockFile('threads/create/token-forbidden.html')),
        );
      }),
    ],
  },
};
