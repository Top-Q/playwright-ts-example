import { test, expect } from '@playwright/test';

test(`should have $350 in account`, async ({ page }) => {
    await page.goto('https://demo.applitools.com/');
    await page.getByPlaceholder('Enter your username').click();
    await page.getByPlaceholder('Enter your username').fill('user');
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill('password');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.locator('.os-icon').first().click();
    await page.getByRole('link', { name: ' Make Payment' }).click();
    await page.getByRole('link', { name: ' Add Account' }).click();
    await page.locator('.avatar-w > img').first().click();
    await page.locator('.menu-w > .logged-user-w > .logged-user-i > .avatar-w > img').click();
    await page.locator('.logged-user-toggler-arrow > .os-icon').click();
    await page.getByRole('link', { name: '  Credit cards' }).click();
    await page.getByRole('link', { name: '  Debit cards' }).click();
    await page.getByRole('link', { name: '  Loans' }).click();
    await page.getByRole('link', { name: '  Mortgages' }).click();
    await page.getByRole('link', { name: 'View Statement ' }).click();
    await expect(page.locator('body')).toContainText('$350');
    await page.locator('.logged-user-w').first().click();
  });