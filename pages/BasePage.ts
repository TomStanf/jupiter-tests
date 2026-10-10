import { Page } from '@playwright/test';

/** Shared behaviour for all page objects. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }
}
