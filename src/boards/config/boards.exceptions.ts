import { appExceptions } from 'src/config/app.exceptions';

export const boardsExceptions = {
  findById: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    notFound: appExceptions.notFound,
    unknown: appExceptions.unknown,
  },
};
