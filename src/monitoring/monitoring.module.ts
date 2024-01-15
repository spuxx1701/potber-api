import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HttpTotalRequestsMetric } from './monitoring.metrics';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [HttpTotalRequestsMetric],
  exports: [HttpTotalRequestsMetric],
})
export class MonitoringModule {}
