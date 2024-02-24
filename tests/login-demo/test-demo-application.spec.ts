import { test, expect } from '@playwright/test';
import { LoginPage } from '../../infra/po/demo-app';

test.describe('Test Demo Login Application', () => {
  test.setTimeout(5000)
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8090/#!/login');
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('should perform registation and login successfuly with fluent api', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let registerPage = (
      await (await (await (await (await
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

  test('should perform registation and login successfuly', async ({ page }) => {
    let loginPage = new LoginPage(page);
    let registerPage = await loginPage.clickOnRegsiterLnk();
    await registerPage.typeToFirstNameTb('Itai');
    await registerPage.typeToLastNameTb('Agmon');
    await registerPage.typeToUsernameTb('itaiag');
    await registerPage.typeToPasswordTb('secret');
    loginPage = await registerPage.clickOnRegisterBtn();
    expect(await loginPage.getAlertText()).toBe('Registration successful');
    await loginPage.typeToUsernameTb('itaiag');
    await loginPage.typeToPasswordTb('secret');
    const overviewPage = await loginPage.clickOnLoginBtn();
    await overviewPage.clickOnDeleteBtn();
    await overviewPage.clickOnLogoutLnk();
  })

  test('should perform registation and login successfuly with nice reports', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await test.step('Register', async () => {
      let registerPage = await loginPage.clickOnRegsiterLnk();
      await registerPage.typeToFirstNameTb('a');
      await registerPage.typeToLastNameTb('a');
      await registerPage.typeToUsernameTb('a');
      await registerPage.typeToPasswordTb('a');
      loginPage = await registerPage.clickOnRegisterBtn();
      expect(await loginPage.getAlertText()).toBe('Registration successful');
    });
    let overviewPage;
    await test.step('Login', async () => {
      await loginPage.typeToUsernameTb('a');
      await loginPage.typeToPasswordTb('a');
      overviewPage = await loginPage.clickOnLoginBtn();
    });
    await test.step('Logout', async () => {
      await overviewPage.clickOnDeleteBtn();
      await overviewPage.clickOnLogoutLnk();

    });

  })


  test('should perform successful registration and login with page objects', async ({ page }) => {
    await page.getByRole('link', { name: 'Register' }).click();
    await page.locator('#firstName').fill('a');
    await page.locator('[name="lastName"]').fill('a');
    await page.getByLabel('First name').fill('a');
    await page.getByLabel('Password').fill('a');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByLabel('Username').click();
    await expect(page.locator('.alert')).toContainText('Registration successful');
    await page.getByLabel('Username').fill('a');
    await page.getByLabel('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('listitem')).toContainText('a (a a)');
    await page.getByText('Delete').click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });

})

