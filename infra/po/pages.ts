import { Locator, Page } from "@playwright/test";

export abstract class AbstractPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

}

export class OverviewPage extends AbstractPage {

}

export class OpenProjectPage extends AbstractPage {

  private readonly selectAProjectToggle: Locator;

  constructor(page: Page) {
    super(page);
    this.selectAProjectToggle = page.locator("#projects-menu i");
  }

  async clickOnSelectAProjectToggle(): Promise<OpenProjectPage> {
    await this.selectAProjectToggle.click();
    return this
  }

  async clickOnProjectName(projectName: string): Promise<OverviewPage> {
    await this.page.locator(`#ui-id-5 >> text=${projectName}`).click()
    return new OverviewPage(this.page);
  }

  async doSelectProject(projectName: string): Promise<OverviewPage> {
    await this.clickOnSelectAProjectToggle();
    await this.clickOnProjectName(projectName);
    return new OverviewPage(this.page);
  }

}

export class LoginPage extends AbstractPage {
  /**
   * @param {import('playwright').Page} page 
   */

  private readonly usernameTb: Locator;
  private readonly passwordTb: Locator;
  private readonly signInBtn: Locator;
  private readonly siginInToggle: Locator;

  constructor(page: Page) {
    super(page);
    this.siginInToggle = page.locator("span:has-text('Sign in')");
    this.usernameTb = page.locator('input[name="username"]');
    this.passwordTb = page.locator('input[name="password"]');
    this.signInBtn = page.locator('input:has-text("Sign in")');
  }
  async navigate(): Promise<LoginPage> {
    await this.page.goto('http://localhost:8080');
    return this;
  }

  async clickOnSignInToggle(): Promise<LoginPage> {
    await this.siginInToggle.click();
    return this;
  }
  async fillUsername(username: string): Promise<LoginPage> {
    await this.usernameTb.fill(username);
    return this;
  }
  async fillPassword(password: string): Promise<LoginPage> {
    await this.passwordTb.fill(password);
    return this;
  }
  async clickOnSignInBtn(): Promise<OpenProjectPage> {
    await this.signInBtn.click();
    return new OpenProjectPage(this.page);
  }
}