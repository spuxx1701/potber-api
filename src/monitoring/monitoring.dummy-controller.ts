import { Controller } from '@nestjs/common';

/**
 * This is an empty controller that is used to disable the default /metrics route.
 * /metrics should not be available within the application context, but instead
 * will be exposed on a different node process.
 */
@Controller()
export class MonitoringDummyController {}
