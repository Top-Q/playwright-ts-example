import { test, expect } from '@playwright/test';


test.describe('Playwright Reporters', () => {
    test.describe.configure({ retries: 2 });
    test('should success', async ({ }) => {

    });

    const data = ['foo', 'bar', 'baz'];
    for (const value of data) {
        test(`should run with parameter ${value}`, async ({ }) => {
            console.log("The value is: " + value);
        });
    }

    test('should fail on assertion', async ({ }) => {
        expect(true).toBe(false);
    });

    test('should have steps', async ({ }) => {
        test.step('Step 1', async () => {
            console.log('log 1');
            console.log('log 2');
            test.step('Step 1.1', async () => {
                console.log('log 1.1');
                console.log('log 1.1.1');
            });
        });
    });


});
