import { Locator } from "@playwright/test";

export class LoginPage {
  /**
   * @param {import('playwright').Page} page 
   */

  page;
  usernameTb: Locator;
  passwordTb: Locator;
  signInBtn: Locator;
  siginInToggle: Locator;

  constructor(page) {
    this.page = page;
    this.siginInToggle = page.locator("span:has-text('Sign in')");
    this.usernameTb = page.locator('input[name="username"]');
    this.passwordTb = page.locator('input[name="password"]');
    this.signInBtn = page.locator('input:has-text("Sign in")');
    // await page.locator("span:has-text('Sign in')").click()
    // // Fill input[name="username"]
    // await page.locator('input[name="username"]').fill('admin');
  
    // // Fill input[name="password"]
    // await page.locator('input[name="password"]').fill('adminadmin');
  
    // // Click input:has-text("Sign in")
    // await Promise.all([
    //   page.locator('input:has-text("Sign in")').click(),
  


  }
  async navigate() {
    await this.page.goto('http://localhost:8080');
  }

  async clickOnSignInToggle() {
    await this.siginInToggle.click();
  }
  async fillUsername(username: string){
    await this.usernameTb.fill(username);
  }
  async fillPassword(password: string){
    await this.passwordTb.fill(password);
  }
  async clickOnSignInBtn(){
    await this.signInBtn.click();
  }
}
module.exports = { LoginPage };