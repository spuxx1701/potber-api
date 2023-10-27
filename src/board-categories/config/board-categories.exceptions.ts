import { appExceptions } from 'src/config/app.exceptions';

export const boardCategoriesExceptions = {
  findAll: {
    unauthorized: appExceptions.unauthorized,
    unknown: appExceptions.unknown,
  },
};
