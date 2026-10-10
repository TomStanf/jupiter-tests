export interface OrderLine {
  name: string;
  quantity: number;
  /** Expected unit price in dollars, per the product catalogue. */
  expectedPrice: number;
}

export const tc3Order: OrderLine[] = [
  { name: 'Stuffed Frog', quantity: 2, expectedPrice: 10.99 },
  { name: 'Fluffy Bunny', quantity: 5, expectedPrice: 9.99 },
  { name: 'Valentine Bear', quantity: 3, expectedPrice: 14.99 },
];
