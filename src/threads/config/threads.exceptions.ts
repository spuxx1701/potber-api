import { appExceptions } from 'src/config/app.exceptions';

export const threadsExceptions = {
  findById: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    unknown: appExceptions.unknown,
  },
  create: {
    validationFailure: appExceptions.validationFailure,
    unauthorized: appExceptions.unauthorized,
    forbidden: appExceptions.forbidden,
    unableToGetToken: appExceptions.unableToGetToken,
    unknown: appExceptions.unknown,
    tooManyRequests: appExceptions.tooManyRequests,
  },
};
