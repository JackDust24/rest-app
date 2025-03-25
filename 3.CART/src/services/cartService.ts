import { Cart } from '../models/Cart';
import {
  Discount,
  FixedDiscount,
  PercentageDiscount,
} from '../models/Discount';
import { Freebie } from '../models/Freebie';

export class CartService {
  private carts: Map<string, Cart> = new Map();
  private lastCartId: number = 0;

  createCart(): string {
    const cartId = `cart_${++this.lastCartId}`;
    this.carts.set(cartId, new Cart());
    return cartId;
  }

  addItem(cartId: string, productId: string, quantity: number = 1): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.addItem(productId, quantity);
  }

  updateItem(cartId: string, productId: string, quantity: number): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.updateItem(productId, quantity);
  }

  removeItem(cartId: string, productId: string): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.removeItem(productId);
  }

  clearCart(cartId: string): void {
    this.carts.delete(cartId);
  }

  // Discounts
  applyDiscount(cartId: string, discount: Discount): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.removeDiscount(discount.name);
    cart.applyDiscount(discount);
  }

  removeDiscountFromCart(cartId: string, discountName: string): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.removeDiscount(discountName);
  }

  addFreebieRule(cartId: string, freebie: Freebie): boolean {
    const cart = this.carts.get(cartId);
    if (!cart) return false;
    cart.addFreebieRule(freebie);
    return true;
  }

  // For the utilities
  getCart(cartId: string): Cart | undefined {
    return this.carts.get(cartId);
  }
}
