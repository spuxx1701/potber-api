import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

/**
 * The external monitoring module does not define any metrics itself, and instead
 * only exposed the /metrics route. The module will be served on a seperate process
 * and listens to another port.
 */
@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      },
    }),
  ],
})
export class MonitoringExternalModule {}
