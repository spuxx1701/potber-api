import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectMetric('http_total_requests')
    public httpTotalRequestsCounter: Counter<string>,
  ) {}

  inreaseHttpTotalRequests() {
    this.httpTotalRequestsCounter.inc();
  }
}
