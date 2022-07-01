import { test, expect } from '@playwright/test';


test.describe("Search", ()=> {
  test('Search for specfic string in Google', async ({ page }) => {

    // Go to https://www.google.com/
    await page.goto('https://www.google.com/');
    await page.locator("[name='q']").fill("Cheese");
  
    // Click text=חיפוש ב-Google >> nth=1
    await page.locator('text=חיפוש ב-Google').nth(1).click();
    await expect(page).toHaveTitle('Cheese - חיפוש ב-Google');
  
    // Go to https://en.wikipedia.org/wiki/Cheese
    await page.goto('https://en.wikipedia.org/wiki/Cheese');
  
  });
});
