import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './NavigationBar';
import { CartPage } from './CartPage';
import { OrderLine } from '../test-data/products';

export class ShopPage extends BasePage {
  private readonly nav: NavigationBar;

  constructor(page: Page) {
    super(page);
    this.nav = new NavigationBar(page);
  }

  async waitUntilLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/#\/shop/);
    await expect(this.page.locator('li.product').first()).toBeVisible();
  }

  private productCard(name: string): Locator {
    return this.page.locator('li.product', {
      has: this.page.getByRole('heading', { name, exact: true }),
    });
  }

  async buy(name: string, quantity: number): Promise<void> {
    const buyButton = this.productCard(name).getByRole('link', { name: 'Buy' });
    for (let i = 0; i < quantity; i++) {
      await buyButton.click();
    }
  }

  async buyAll(order: OrderLine[]): Promise<void> {
    for (const line of order) {
      await this.buy(line.name, line.quantity);
    }
  }

  async goToCartPage(): Promise<CartPage> {
    await this.nav.goToCart();
    const cartPage = new CartPage(this.page);
    await cartPage.waitUntilLoaded();
    return cartPage;
  }
}
