import { Locator, Page } from '@playwright/test';

/** Component object: the top nav that appears on every page. */
export class NavigationBar {
  private readonly contactLink: Locator;
  private readonly shopLink: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.contactLink = page.locator('#nav-contact a');
    this.shopLink = page.locator('#nav-shop a');
    this.cartLink = page.locator('#nav-cart a');
  }

  async goToContact(): Promise<void> {
    await this.contactLink.click();
  }

  async goToShop(): Promise<void> {
    await this.shopLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
