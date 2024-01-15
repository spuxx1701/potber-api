import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MonitoringDummyController } from './monitoring.dummy-controller';

/**
 * The internal monitoring module does not expose a /metrics route, but defines and
 * collects metrics from the application. It is included into the main application module.
 */
@Module({
  imports: [
    PrometheusModule.register({
      controller: MonitoringDummyController,
    }),
  ],
})
export class MonitoringInteralModule {}
