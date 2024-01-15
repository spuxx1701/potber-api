import { createTestContainer } from 'test/container';
import { MonitoringDummyController } from './monitoring.dummy-controller';

describe('Monitoring | Dummy controller', () => {
  let controller: MonitoringDummyController;

  beforeEach(async () => {
    const container = await createTestContainer({
      controllers: [MonitoringDummyController],
    });

    controller = container.module.get<MonitoringDummyController>(
      MonitoringDummyController,
    );
  });

  it('should build', () => {
    expect(controller).toBeInstanceOf(MonitoringDummyController);
  });
});
