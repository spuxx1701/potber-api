import { rest } from 'msw';
import { forumConfig } from 'src/config/forum.config';

export const usersHandlers = {
  usernames: {
    success: {
      threeMatches: [
        rest.get(
          `${forumConfig.FORUM_URL}pm/async/usernames.php`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.text(`Foo\nFooBar\nFooMaster`));
          },
        ),
      ],
      noMatches: [
        rest.get(
          `${forumConfig.FORUM_URL}pm/async/usernames.php`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.text(``));
          },
        ),
      ],
    },
  },
};
