import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

export const HttpTotalRequestsMetric = makeCounterProvider({
  name: 'http_requests_total',
  help: 'The total number of incoming http requests.',
});
