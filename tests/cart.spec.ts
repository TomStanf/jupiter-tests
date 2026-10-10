import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { tc3Order } from '../test-data/products';

test.describe('Shopping cart', () => {
  test('TC3: cart prices, subtotals and total are correct', async ({ page }) => {
    // 1. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    const homePage = new HomePage(page);
    await homePage.open();
    const shopPage = await homePage.goToShopPage();
    await shopPage.buyAll(tc3Order);

    // 2. Go to the cart page
    const cartPage = await shopPage.goToCartPage();
    await cartPage.expectItemsMatchOrder(tc3Order);

    // 3 & 4. Verify price and subtotal (price x quantity) for each product
    await cartPage.expectPricesAndSubtotals(tc3Order);

    // 5. Verify total = sum(subtotals)
    await cartPage.expectTotalEqualsSumOfSubtotals();
  });
});
