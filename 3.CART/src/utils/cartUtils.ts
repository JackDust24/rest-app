import { Cart } from '../models/Cart';

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

  calculateSubtotal(): number {
    return this.cart.getItems().reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const discountAmount = this.cart
      .getDiscounts()
      .reduce((total, discount) => {
        return total + discount.calculateDiscountAmount(subtotal - total);
      }, 0);
    return Math.max(0, subtotal - discountAmount);
  }
}
