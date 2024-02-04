import { test, expect, type Page } from '@playwright/test';
import {LoginPage, OpenProjectPage} from '../../infra/po/pages';


test.describe('Task', () => {

  test('create task', async ({ page }) => {
    const randomTaskName = "Task-" + Math.random().toString(36).substring(7);
    let loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.clickOnSignInToggle();
    await loginPage.fillUsername("admin");
    await loginPage.fillPassword("adminadmin");
    let openProjectPage = await loginPage.clickOnSignInBtn();
    await openProjectPage.clickOnSelectAProjectToggle();
    let overviewPage = await openProjectPage.clickOnProjectName("Demo project");
    let allOpenWpPage = await overviewPage.mainMenu.clickOnWorkPackagesItm();
    let newTaskPage = await allOpenWpPage.clickOnCreateNewWorkPackageBtn();
    await newTaskPage.fillSubject(randomTaskName);
    await newTaskPage.fillEstimatedTime("25");
    await newTaskPage.clickOnSaveBtn();

    let filterComponent = await allOpenWpPage.clickOnActivateFilterBtn();
    await filterComponent.fillFilterByText(randomTaskName);
    await allOpenWpPage.clickOnDeactivateFilterBtn();
    expect(await allOpenWpPage.table.containsText(randomTaskName)).toBeTruthy();
    let userMenu = await allOpenWpPage.clickOnUserMenu();
    await userMenu.clickOnSignOutBtn();
  });

});


