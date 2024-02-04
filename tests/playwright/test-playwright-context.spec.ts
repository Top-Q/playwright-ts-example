import { test, expect } from '@playwright/test';

test.describe('Test Playwright Examples', () => {

test("Test multiple contexts", async ({ browser }) => {
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    await adminPage.goto('http://localhost:8080/');
    await adminPage.getByRole('link', { name: 'Sign in ' }).click();
    await adminPage.getByLabel('Username').fill('admin');
    await adminPage.getByLabel('Password').fill('adminadmin');
    await adminPage.getByRole('button', { name: 'Sign in' }).click();

    const userPage = await userContext.newPage();
    await userPage.goto('http://localhost:8080/');
    await userPage.getByRole('link', { name: 'Sign in ' }).click();
    await userPage.getByLabel('Username').fill('user');
    await userPage.getByLabel('Password').fill('useruser');
    await userPage.getByRole('button', { name: 'Sign in' }).click();
  });

  
  const authFile = 'user.json';
  test("Test save state", async ({page}) => {
    await page.goto('http://localhost:8080/');
    await page.getByRole('link', { name: 'Sign in ' }).click();
    await page.getByLabel('Username').fill('admin');
    await page.getByLabel('Password').fill('adminadmin');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.context().storageState({ path: authFile });
  });

  test("Test restore state", async ({browser}) => {
    const page = await browser.newPage({storageState: authFile});
    await page.goto('http://localhost:8080/');
    // We are logged in
    await page.locator('#main-menu-work-packages').click();
  });

});
