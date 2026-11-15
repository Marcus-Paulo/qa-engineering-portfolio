import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByTestId('login-username');
    this.password = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submitButton.click();
  }

  async expectSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/pessoas/);
  }
}
