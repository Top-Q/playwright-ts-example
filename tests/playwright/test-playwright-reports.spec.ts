import { test as base, expect } from '@playwright/test';



const test = base.extend<{logFixture: string}>({
    logFixture: async ({}, use) => {
      console.log('In the logFixture - Before');
      await use("logFixture");
      console.log('In the logFixture - After');
    },
  });

test.describe('Playwright Reports', () => {
    test.describe.configure({retries: 2});
    test('Test that uses logFixture', async ({ logFixture }) => {
        console.log(logFixture);
    });

    const data = ['foo', 'bar', 'baz'];
    for (const value of data) {
        test(`Test with paramter ${value}`, async ({ }) => {
            console.log("The value is: "+ value);
        });
    }
    

    test('Console Report', async ({ logFixture }) => {
        console.log(logFixture);
        test.step('Step 1', async () => {
            console.log('log 1');
            console.log('log 2');
            test.step('Step 1.1', async () => {
                console.log('log 1.1');
                console.log('log 1.1.1');
            });
        });

    });
    test('Test that fails', async ({ page }) => {
        expect(true).toBe(false);
    });


});
