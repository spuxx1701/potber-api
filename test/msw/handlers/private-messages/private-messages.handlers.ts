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
          ctx.text(
            readHandlerMockFile('private-messages/send/send.success.html'),
          ),
        );
      }),
    ],
    invalidUser: [
      rest.post(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (req.url.searchParams.get('a') !== '6') return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile('private-messages/send/send.invalid-user.html'),
          ),
        );
      }),
    ],
    unknown: [
      rest.post(`${forumConfig.FORUM_URL}pm`, (req, res, ctx) => {
        if (req.url.searchParams.get('a') !== '6') return res(ctx.status(404));
        return res(
          ctx.status(200),
          ctx.text(
            readHandlerMockFile('private-messages/send/send.unnknown.html'),
          ),
        );
      }),
    ],
  },
};
