import { test,expect } from '@playwright/test';


const data = ['foo', 'bar', 'baz'];
for (const value of data) {
    test(`Test with paramter ${value}`, async ({ }) => {
        console.log("The value is: "+ value);
    });
}