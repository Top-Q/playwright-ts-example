const { test } = require('@playwright/test');
class MyService {

  async init() {
    console.log('init');
  }

  async perform() {
    console.log('perform');
  }

  async dispose() {
    console.log('dispose');
  }


}


test.describe('traditional way', () => {
  let service: MyService
  test.beforeEach(async ({ }) => {
    service = new MyService();
    service.init();
  });

  test.afterEach(async () => {
    service.dispose();
  });

  test('should use service', async () => {
    service.perform();
  });

});