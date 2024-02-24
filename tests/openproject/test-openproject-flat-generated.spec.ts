import { test, expect, Locator } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.describe('Test Open Project - Auto generated', () => {
  test('should create new task', async ({ page }) => {
    const randomTaskName = Math.random().toString(36).substring(7);
    await page.goto('http://localhost:8080/');
    
    await page.getByRole('link', { name: 'Sign in ' }).click();
    let userNameTb: Locator = page.getByLabel('Username')
    await userNameTb.fill('admin');    
    await page.getByLabel('Password').fill('adminadmin');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('link', { name: 'Select a project ' }).click();
    await page.locator('#ui-id-2').getByRole('link', { name: 'Demo project' }).click();
  
    await page.locator('#main-menu-work-packages').click();
    await page.locator('wp-create-button').getByLabel('Create new work package').click();
    await page.getByLabel('Task', { exact: true }).click();
    await page.getByLabel('Subject', { exact: true }).fill(randomTaskName);
    await page.locator('#wp-new-inline-edit--field-assignee').getByRole('combobox').click();
    await page.getByLabel('Estimated time', { exact: true }).click();
    await page.getByLabel('Estimated time', { exact: true }).fill('10');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Up' }).click();
    await page.getByRole('link', { name: 'Work packages' }).click();
    await page.getByRole('combobox').click();
    await page.getByRole('combobox').fill(randomTaskName);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('table')).toContainText(randomTaskName);
    await page.getByRole('link', { name: 'OA', exact: true }).click();
    await page.getByRole('link', { name: 'Sign out' }).click();
  });
});

