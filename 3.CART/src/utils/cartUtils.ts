import { Cart } from '../models/Cart';
import { Discount } from '../models/Discount';

export class CartUtils {
  constructor(private cart: Cart) {}

  isProductInCart(productId: string): boolean {
    return this.cart.getItems().some((item) => item.productId === productId);
  }

  isCartEmpty(): boolean {
    return this.cart.getItems().length === 0;
  }

  listItems(): ReadonlyArray<{ productId: string; quantity: number }> {
    return this.cart.getItems();
  }

  countUniqueItems(): number {
    return this.cart.getItems().length;
  }

  getTotalQuantity(): number {
    return this.cart.getTotalQuantity();
  }

  calculateSubtotal(productPriceMap: Record<string, number>): number {
    return this.cart.getItems().reduce((total, item) => {
      const price = productPriceMap[item.productId];
      return total + price * item.quantity;
    }, 0);
  }

  calculateTotal(productPriceMap: Record<string, number>): number {
    const subtotal = this.calculateSubtotal(productPriceMap);
    const discountAmount = this.cart
      .getDiscounts()
      .reduce((total, discount) => {
        return total + discount.calculateDiscountAmount(subtotal - total);
      }, 0);
    return subtotal - discountAmount;
  }
}
