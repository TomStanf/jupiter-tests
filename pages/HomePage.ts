import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './NavigationBar';
import { ContactPage } from './ContactPage';
import { ShopPage } from './ShopPage';

export class HomePage extends BasePage {
  readonly nav: NavigationBar;

  constructor(page: Page) {
    super(page);
    this.nav = new NavigationBar(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async goToContactPage(): Promise<ContactPage> {
    await this.nav.goToContact();
    const contactPage = new ContactPage(this.page);
    await contactPage.waitUntilLoaded();
    return contactPage;
  }

  async goToShopPage(): Promise<ShopPage> {
    await this.nav.goToShop();
    const shopPage = new ShopPage(this.page);
    await shopPage.waitUntilLoaded();
    return shopPage;
  }
}
