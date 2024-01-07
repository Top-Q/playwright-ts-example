import { test, expect } from '@playwright/test';
import { LoginPage } from '../infra/po/demo-app';

test.describe('Test Demo Login Application', ()=>{
  
  test.beforeEach(async({page}) => {
    await page.goto('http://localhost:8080/#!/login');
  })

  test.afterEach(async({page}) => {
    await page.close()
  })

  test('Test with fluent page objects',async ({page}) => {
    let loginPage = new LoginPage(page);
    let registerPage = (
      await(await(await(await(await
        loginPage.clickOnRegsiterLnk())
        .typeToFirstNameTb('a'))
        .typeToLastNameTb('a'))
        .typeToUsernameTb('a'))
        .typeToPasswordTb('a'))
        .clickOnRegisterBtn();
    expect(await loginPage.getAlertText()).toBe('Registration successful');
    await loginPage.typeToUsernameTb('a');
    await loginPage.typeToPasswordTb('a');
    const welcomePage = await loginPage.clickOnLoginBtn();
    await welcomePage.clickOnDeleteBtn();
    await welcomePage.clickOnLogoutLnk();    

  })
  

  
  test('Test with page objects',async ({page}) => {
    let loginPage = new LoginPage(page);
    await test.step('Register', async () => {
      let registerPage = await loginPage.clickOnRegsiterLnk();
      await registerPage.typeToFirstNameTb('a');
      await registerPage.typeToLastNameTb('a');
      await registerPage.typeToUsernameTb('a');
      await registerPage.typeToPasswordTb('a');
      loginPage = await registerPage.clickOnRegisterBtn();
      expect(await loginPage.getAlertText()).toBe('Registration successful');    
    }  );
    let overviewPage;
    await test.step('Login', async () => {
      await loginPage.typeToUsernameTb('a');
      await loginPage.typeToPasswordTb('a');
      overviewPage = await loginPage.clickOnLoginBtn();
    }  );
    await test.step('Logout', async () => {
      await overviewPage.clickOnDeleteBtn();
      await overviewPage.clickOnLogoutLnk();    

    });

  })

  test('Test image comparison', async ({page}) => {
    await expect(page).toHaveScreenshot();
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveScreenshot();
  });
  
  test('test without page objects', async ({ page }) => {    
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('#firstName').click();
    await page.locator('#firstName').fill('a');
    await page.locator('#Text1').click();
    await page.locator('#Text1').fill('a');
    await page.getByLabel('First name').click();
    await page.getByLabel('First name').fill('a');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('a');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('body')).toContainText('Registration successful');
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('a');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Hi a!' })).toBeVisible();
    await page.getByText('Delete').click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });
})

