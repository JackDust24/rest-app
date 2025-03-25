export abstract class DiscountBase {
  constructor(public readonly name: string) {}
  abstract calculateDiscountAmount(subtotal: number): number;
}

export class FixedDiscount extends DiscountBase {
  readonly type = 'fixed' as const;

  constructor(name: string, public readonly value: number) {
    super(name);
  }

  calculateDiscountAmount(subtotal: number) {
    return Math.min(this.value, subtotal);
  }
}

export class PercentageDiscount extends DiscountBase {
  readonly type = 'percentage' as const;

  constructor(
    name: string,
    public readonly value: number,
    public readonly maxAmount?: number
  ) {
    super(name);
  }

  calculateDiscountAmount(subtotal: number) {
    const amount = subtotal * (this.value / 100);
    return this.maxAmount ? Math.min(amount, this.maxAmount) : amount;
  }
}

export type Discount = FixedDiscount | PercentageDiscount;

// Type Guards
export function isFixedDiscount(discount: Discount): discount is FixedDiscount {
  return discount instanceof FixedDiscount;
}

export function isPercentageDiscount(
  discount: Discount
): discount is PercentageDiscount {
  return discount instanceof PercentageDiscount;
}
