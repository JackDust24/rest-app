import { Freebie } from './Freebie';
import { Discount } from './Discount';

export type CartItem = {
  productId: string;
  quantity: number;
};

export class Cart {
  private cartItems: CartItem[];
  private discounts: Discount[];
  private freebies: Freebie[];
  constructor() {
    this.cartItems = [];
    this.discounts = [];
    this.freebies = [];
  }

  addItem(productId: string, quantity: number) {
    const existingItem = this.cartItems.find(
      (item) => item.productId === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    } else {
      this.cartItems.push({ productId, quantity });
      this.applyFreebieRules();
    }
  }

  updateItem(productId: string, quantity: number) {
    const existingItem = this.cartItems.find(
      (item) => item.productId === productId
    );
    if (existingItem) {
      existingItem.quantity = quantity;
    }
    this.applyFreebieRules();
  }

  removeItem(productId: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.applyFreebieRules();
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotalQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  /* DISCOUNTS */
  applyDiscount(discount) {
    this.discounts.push(discount);
  }

  removeDiscount(name) {
    const isDiscountExist = this.discounts.find(
      (discount) => discount.name === name
    );
    if (isDiscountExist) {
      this.discounts = this.discounts.filter((d) => d.name !== name);
    }
  }

  addFreebieRule(freebie: Freebie): void {
    this.freebies.push(freebie);
    this.applyFreebieRules();
  }

  // Private implementation
  private applyFreebieRules(): void {
    this.freebies.forEach((freebie) => {
      const hasRequiredProduct = this.cartItems.some(
        (item) => item.productId === freebie.requiredProductId
      );
      const hasFreebie = this.cartItems.some(
        (item) => item.productId === freebie.freebieProductId
      );

      if (hasRequiredProduct && !hasFreebie) {
        this.cartItems.push({
          productId: freebie.freebieProductId,
          quantity: freebie.quantity,
        });
      }
    });
  }

  /* GETTER METHODS */
  getItems(): ReadonlyArray<CartItem> {
    return [...this.cartItems];
  }

  getDiscounts(): ReadonlyArray<Discount> {
    return [...this.discounts];
  }

  getFreebies(): ReadonlyArray<Freebie> {
    return [...this.freebies];
  }
}
