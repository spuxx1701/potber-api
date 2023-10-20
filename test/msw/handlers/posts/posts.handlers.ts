import { rest } from 'msw';
import { forumConfig } from 'src/config/forum.config';
import { readHandlerMockFile } from 'test/helpers/test-utils';

export const postsHandlers = {
  report: {
    success: [
      rest.post(`${forumConfig.FORUM_URL}reportpost.php`, (req, res, ctx) => {
        const html = readHandlerMockFile('posts/report/report.success.html');
        return res(ctx.status(200), ctx.text(html));
      }),
    ],
    notFound: [
      rest.post(`${forumConfig.FORUM_URL}reportpost.php`, (req, res, ctx) => {
        const html = readHandlerMockFile(
          'posts/report/report.failure-not-found.html',
        );
        return res(ctx.status(200), ctx.text(html));
      }),
    ],
    alreadyReported: [
      rest.post(`${forumConfig.FORUM_URL}reportpost.php`, (req, res, ctx) => {
        const html = readHandlerMockFile(
          'posts/report/report.failure-already-reported.html',
        );
        return res(ctx.status(200), ctx.text(html));
      }),
    ],
    unknownFailure: [
      rest.post(`${forumConfig.FORUM_URL}reportpost.php`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.text('foo bar'));
      }),
    ],
  },
};
