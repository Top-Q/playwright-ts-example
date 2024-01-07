import { test, expect, Page, Locator } from '@playwright/test';

export abstract class AbstractPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

}

export class OverviewPage extends AbstractPage {

  private readonly logoutLnkL: Locator;
  private readonly deleteBtnL: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLnkL = this.page.getByRole('link', { name: 'Logout' });
    this.deleteBtnL = this.page.getByText('Delete');
  }

  async clickOnLogoutLnk(): Promise<LoginPage> {
    await this.logoutLnkL.click();
    return new LoginPage(this.page);
  }

  async clickOnDeleteBtn(): Promise<OverviewPage> {
    await this.deleteBtnL.click();
    return this;
  }


}

export class RegisterPage extends AbstractPage {

  private readonly usernameTbL: Locator;
  private readonly firstNameTbL: Locator;
  private readonly lastNameTbL: Locator;
  private readonly passwordTbL: Locator;
  private readonly registerBtnL: Locator;
  

  constructor(page: Page) {
    super(page);
    this.usernameTbL = this.page.locator('#Text1');
    this.firstNameTbL = this.page.locator('#firstName');
    this.lastNameTbL = this.page.getByLabel('First name');
    this.passwordTbL = this.page.getByLabel('Password');
    this.registerBtnL = this.page.getByRole('button', { name: 'Register' });

  }

  async typeToUsernameTb(username: string) : Promise<RegisterPage>{
    await this.usernameTbL.fill(username);
    return this;
  }

  async typeToFirstNameTb(firstName: string): Promise<RegisterPage>{
    await this.firstNameTbL.fill(firstName);
    return this;
  }

  async typeToLastNameTb(lastName: string): Promise<RegisterPage>{
    await this.lastNameTbL.fill(lastName);
    return this;
  }

  async typeToPasswordTb(password: string): Promise<RegisterPage>{
    await this.passwordTbL.fill(password);
    return this;
  }

  async clickOnRegisterBtn(): Promise<LoginPage>{
    await this.registerBtnL.click();
    return new LoginPage(this.page);
  }

}

export class LoginPage extends AbstractPage{

  private readonly registerLnkL: Locator;
  private readonly alertL: Locator;
  private readonly usernameTbL: Locator;
  private readonly passwordTbL: Locator;
  private readonly loginBtnL: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLnkL = page.getByRole('link', { name: 'Register' });
    this.alertL = page.locator('.alert');
    this.usernameTbL = page.getByLabel('Username');
    this.passwordTbL = page.getByLabel('Password');
    this.loginBtnL = page.getByRole('button', { name: 'Login' });
  }

  async getAlertText(): Promise<null|string> {
    return await this.alertL.textContent();
  }

  async clickOnRegsiterLnk(): Promise<RegisterPage> {
    await this.registerLnkL.click();
    return new RegisterPage(this.page);
  }

  async typeToUsernameTb(username: string): Promise<LoginPage>{
    await this.usernameTbL.fill(username);
    return this;
  }

  async typeToPasswordTb(password: string): Promise<LoginPage>{
    await this.passwordTbL.fill(password);
    return this;
  }

  async clickOnLoginBtn(): Promise<OverviewPage>{
    await this.loginBtnL.click();
    return new OverviewPage(this.page);
  }


}