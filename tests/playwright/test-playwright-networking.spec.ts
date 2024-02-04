import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Test Playwright Examples', () => {


  test('Test monitor requests and responses', async ({ page }) => {
    // Subscribe to 'request' and 'response' events.
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    await page.goto('http://localhost:8080');
  })

  test('Expect response', async ({ page }) => {
    // Subscribe to 'request' and 'response' events.
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    await page.goto('http://localhost:8080');
  });

  test('Test wait for response from table', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'Sign in ' }).click();
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('adminadmin');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: 'Select a project ' }).click();
    await page.locator('#ui-id-2').getByRole('link', { name: 'Demo project' }).click();
    await page.locator('#main-menu-work-packages').click();
    await page.getByLabel('Activate Filter').click();
    await page.getByPlaceholder('Subject, description,').click();
    const responsePromise = page.waitForResponse('**/queries/**');
    await page.getByPlaceholder('Subject, description,').fill('My new task');
    const response = await responsePromise
    console.log(response.body());
    await expect(page.getByRole('table')).toContainText('My new task');
  });

  test("Test mock response", async ({ page }) => {
    await page.route('**/api/test', route => {
      const html = `<html><body><h1>Welcome to the Matrix</h1></body></html>`;
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: html,
      });
    });
    await page.goto('http://localhost:8080/api/test');
    expect(await page.content()).toContain('Welcome to the Matrix');
  });

  
  test("Test visual comparison with mask", async ({browser}) => {
    const page = await browser.newPage({storageState: authFile});
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'Sign in ' }).click();
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('adminadmin');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: 'Select a project ' }).click();
    await page.locator('#ui-id-2').getByRole('link', { name: 'Demo project' }).click();
    await page.locator('#main-menu-work-packages').click();
    await expect(page).toHaveScreenshot('work-packages.png', { mask: [page.locator('.work-package-table')] });
  });
});



