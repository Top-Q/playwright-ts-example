import { test, expect, type Page } from '@playwright/test';
import {LoginPage, OpenProjectPage} from '../infra/po/pages';



async function performLogin(page: Page) {
  const loginPage = new LoginPage(page);
  await test.step('Performing login', async () => {
    await (await (await (await (await loginPage
      .navigate())
      .clickOnSignInToggle())
      .fillUsername("admin"))
      .fillPassword("adminadmin"))
      .clickOnSignInBtn();
    await expect(page).toHaveURL('http://localhost:8080/');
  
  });
}


test.describe('Task', () => {
  test.beforeEach(async ({ page }) => {
    await performLogin(page);
  });

  test('create task', async ({ page }) => {
    const openProjectPage = new OpenProjectPage(page);
    await openProjectPage.clickOnSelectAProjectToggle();
    await openProjectPage.clickOnProjectName("Selenium project");

    await page.locator("#main-menu-work-packages >> text=Work packages").click();

    await page.locator("text=Create Include projects >> [aria-label='Create new work package']").click();
    await page.locator("div#types-context-menu a[aria-label='Task']").click();
    let task_name = "Task " + Math.random();
    await page.locator("id=wp-new-inline-edit--field-subject").fill(task_name);
    await page.locator("button:has-text('Save')").click();
    await page.locator("[aria-label='Activate Filter']").click();
    await page.locator("id=filter-by-text-input").fill(task_name);
    await page.locator("a[title='Close form']").click();
    await page.locator("button[title='Close details view'] i.icon-close.icon-no-color").click();
    await page.locator("text='(1 - 1/1)'").waitFor();
    let locator = page.locator("i.icon-show-more-horizontal");
    await locator.hover();
    await locator.click();
    await page.locator("[aria-label='Delete']").click();

    await page.locator("button:has-text('Confirm')").click();
    await page.locator("text=Successfully deleted work packages.").waitFor();
    await page.locator("text=No work packages to display.").waitFor();

  });

});
