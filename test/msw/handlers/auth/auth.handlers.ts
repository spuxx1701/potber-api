import { rest } from 'msw';
import { forumConfig } from 'src/config/forum.config';
import { readHandlerMockFile } from 'test/helpers/test-utils';

export const authHandlers = {
  login: {
    success: [
      rest.post(`${forumConfig.LOGIN_URL}`, async (req, res, ctx) => {
        const xml = readHandlerMockFile(
          'auth/login/success/login.response.xml',
        );
        return res(ctx.status(200), ctx.text(xml));
      }),
      rest.get(`${forumConfig.SSO_URL}`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.cookie('MDESID', 'foo', {
            secure: true,
            sameSite: 'none',
            httpOnly: true,
          }),
          ctx.cookie('MDESID', 'bar', {
            secure: true,
            sameSite: 'none',
            httpOnly: true,
          }),
        );
      }),
      rest.get(`${forumConfig.API_URL}/boards.php`, (req, res, ctx) => {
        const xml = readHandlerMockFile(
          'auth/login/success/boards.response.xml',
        );
        return res(ctx.status(200), ctx.text(xml));
      }),
      rest.get(`${forumConfig.USER_PAGE_URL}0`, (req, res, ctx) => {
        const xml = readHandlerMockFile(
          'auth/login/success/user.response.html',
        );
        return res(ctx.status(200), ctx.text(xml));
      }),
    ],
  },
};
