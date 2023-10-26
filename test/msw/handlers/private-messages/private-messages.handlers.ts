import { rest } from 'msw';
import { forumConfig } from 'src/config/forum.config';
import { readHandlerMockFile } from 'test/helpers/test-utils';

export const privateMessagesHandlers = {
  send: {
    success: [
      rest.post(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (req.url.searchParams.get('a') !== '6') return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(readHandlerMockFile('private-messages/send/success.html')),
        );
      }),
    ],
    invalidUser: [
      rest.post(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (req.url.searchParams.get('a') !== '6') return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile('private-messages/send/invalid-user.html'),
          ),
        );
      }),
    ],
    unknown: [
      rest.post(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (req.url.searchParams.get('a') !== '6') return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(readHandlerMockFile('private-messages/send/unknown.html')),
        );
      }),
    ],
  },
  replyOrForward: {
    success: [
      rest.get(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (
          req.url.searchParams.get('a') !== '5' ||
          !req.url.searchParams.get('reply')
        )
          return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile(
              'private-messages/reply-or-forward/success.html',
            ),
          ),
        );
      }),
    ],
    notFound: [
      rest.get(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (
          req.url.searchParams.get('a') !== '5' ||
          !req.url.searchParams.get('reply')
        )
          return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile(
              'private-messages/reply-or-forward/not-found.html',
            ),
          ),
        );
      }),
    ],
    unknown: [
      rest.get(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile(
              'private-messages/reply-or-forward/unknown.html',
            ),
          ),
        );
      }),
    ],
  },
};
