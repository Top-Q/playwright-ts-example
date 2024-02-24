import { test as base } from '@playwright/test';

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

const test = base.extend<{ service: MyService }>({
  service: async ({ }, use) => {
    let service = new MyService();
    await service.init();
    await use(service);
    await service.dispose();
  },
});

test('should use service', async ({ service }) => {
  await service.perform();
});

