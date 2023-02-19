import { AppController } from './app.controller';

describe('App | AppController', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  describe('index', () => {
    it('should return some information about the api', () => {
      const actual = appController.index();
      expect(actual).toHaveProperty('title');
      expect(actual).toHaveProperty('description');
      expect(actual).toHaveProperty('documentation');
    });
  });
});
