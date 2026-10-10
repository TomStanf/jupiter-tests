import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { parseMoneyToCents, toCents } from '../utils/money';
import { OrderLine } from '../test-data/products';

export interface CartRow {
  name: string;
  priceCents: number;
  quantity: number;
  subtotalCents: number;
}

export class CartPage extends BasePage {
  private readonly rows: Locator;
  private readonly total: Locator;

  constructor(page: Page) {
    super(page);
    this.rows = page.locator('table.cart-items tbody tr');
    this.total = page.locator('tfoot .total');
  }

  async waitUntilLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/#\/cart/);
    await expect(this.rows.first()).toBeVisible();
  }

  private async readRow(row: Locator): Promise<CartRow> {
    const cells = row.locator('td');
    return {
      name: (await cells.nth(0).innerText()).trim(),
      priceCents: parseMoneyToCents(await cells.nth(1).innerText()),
      quantity: parseInt(await cells.nth(2).locator('input').inputValue(), 10),
      subtotalCents: parseMoneyToCents(await cells.nth(3).innerText()),
    };
  }

  async getRows(): Promise<CartRow[]> {
    const count = await this.rows.count();
    const result: CartRow[] = [];
    for (let i = 0; i < count; i++) {
      result.push(await this.readRow(this.rows.nth(i)));
    }
    return result;
  }

  async getTotalCents(): Promise<number> {
    return parseMoneyToCents(await this.total.innerText());
  }

  // ---- Assertions ----

  async expectItemsMatchOrder(order: OrderLine[]): Promise<void> {
    const rows = await this.getRows();
    expect(rows.map((r) => r.name).sort()).toEqual(order.map((o) => o.name).sort());
  }

  async expectPricesAndSubtotals(order: OrderLine[]): Promise<void> {
    const rows = await this.getRows();
    for (const line of order) {
      const row = rows.find((r) => r.name === line.name);
      expect(row, `"${line.name}" should be in the cart`).toBeDefined();
      expect(row!.quantity, `${line.name} quantity`).toBe(line.quantity);
      expect(row!.priceCents, `${line.name} unit price`).toBe(toCents(line.expectedPrice));
      expect(row!.subtotalCents, `${line.name} subtotal`).toBe(
        row!.priceCents * row!.quantity,
      );
    }
  }

  async expectTotalEqualsSumOfSubtotals(): Promise<void> {
    const rows = await this.getRows();
    const sum = rows.reduce((acc, r) => acc + r.subtotalCents, 0);
    expect(await this.getTotalCents(), 'cart total').toBe(sum);
  }
}
