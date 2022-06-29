import { test, expect, type Page } from '@playwright/test';

async function performLogin(page: Page) {
  await page.goto('http://localhost:8080/');

  await page.locator("span:has-text('Sign in')").click()
  // Fill input[name="username"]
  await page.locator('input[name="username"]').fill('admin');

  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('adminadmin');

  // Click input:has-text("Sign in")
  await page.locator('input:has-text("Sign in")').click();
  await expect(page).toHaveURL('http://localhost:8080/');

}


test.describe('Task', () => {
  test.beforeEach(async ({ page }) => {
    await performLogin(page);

  });



  test('create task', async ({ page }) => {


    // Go to http://localhost:8080/

    await page.pause();
    // Click #projects-menu i
    await page.locator('#projects-menu i').click();

    // Click text=Select a project
    await page.locator('text=Select a project').click();

    // Click text=Select a project
    await page.locator('text=Select a project').click();

    // Click #ui-id-10 >> text=Selenium project
    await page.locator('#ui-id-10 >> text=Selenium project').click();
    await expect(page).toHaveURL('http://localhost:8080/projects/selenium-project/');

    // Click #main-menu-work-packages >> text=Work packages
    await page.locator('#main-menu-work-packages >> text=Work packages').click();
    await expect(page).toHaveURL('http://localhost:8080/projects/selenium-project/work_packages');

    // Click text=Create Include projects 1 Filter 1Table >> [aria-label="Create new work package"]
    await page.locator('text=Create Include projects 1 Filter 1Table >> [aria-label="Create new work package"]').click();

    // Click [aria-label="Task"] >> text=Task
    await page.locator('[aria-label="Task"] >> text=Task').click();
    await expect(page).toHaveURL('http://localhost:8080/projects/selenium-project/work_packages/create_new?type=1');

    // Click text=Subject - >> input[type="text"]
    await page.locator('text=Subject - >> input[type="text"]').click();

    // Fill text=Subject - >> input[type="text"]
    await page.locator('text=Subject - >> input[type="text"]').fill('My new task');

    // Click button:has-text("Save")
    await page.locator('button:has-text("Save")').click();
    await expect(page).toHaveURL('http://localhost:8080/projects/selenium-project/work_packages/details/212/overview');

    // Click op-scrollable-tabs button >> nth=1
    await page.locator('op-scrollable-tabs button').nth(1).click();
    await expect(page).toHaveURL('http://localhost:8080/projects/selenium-project/work_packages');

  });

});
