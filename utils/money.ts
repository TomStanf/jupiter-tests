/** Money is handled in integer cents to avoid floating-point rounding errors. */
export function parseMoneyToCents(text: string): number {
  const match = text.match(/-?\d+(?:\.\d+)?/);
  if (!match) throw new Error(`No monetary value found in "${text}"`);
  return Math.round(parseFloat(match[0]) * 100);
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}
