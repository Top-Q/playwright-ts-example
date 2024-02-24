import { test, expect } from '@playwright/test';

test('login-demo - exercise 0', async({page}) => {
    // Generate random username to avoid conflicts and assert that the user is logged in
  
  await page.goto('http://localhost:8090/');
  await page.getByRole('link', { name: 'Register' }).click();
  
  await page.locator('#firstName').fill('A');

  await page.locator('#Text1').fill('A');   // Replace with better selector
  
  await page.getByLabel('First name').fill('A');
  await page.getByLabel('Password').fill('A');
  await page.getByRole('button', { name: 'Register' }).click();
  
  await expect(page.locator('body')).toContainText('Registration successful'); // Replace with better selector
  await page.getByLabel('Username').fill('A');
  await page.getByLabel('Password').fill('A');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page.locator('h1')).toContainText('Hi A!');
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('login-demo - solution 0', async({page}) => {
    // Generate random username to avoid conflicts and assert that the user is logged in
  
  await page.goto('http://localhost:8090/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('#firstName').click();
  await page.locator('#firstName').fill('A');
  
  // Replace with better selector
  await page.locator('#Text1').click();
  await page.locator('#Text1').fill('A');
  
  await page.getByLabel('First name').click();
  await page.getByLabel('First name').fill('A');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('A');
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Replace with better selector
  await expect(page.locator('body')).toContainText('Registration successful');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('A');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('A');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page.locator('h1')).toContainText('Hi A!');
  await page.getByRole('link', { name: 'Logout' }).click();
});