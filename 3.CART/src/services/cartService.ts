import { Cart } from '../models/Cart';
import { Discount } from '../models/Discount';
import { Freebie } from '../models/Freebie';
import { CartUtils } from '../utils/cartUtils';

export class CartService {
  private carts: Map<string, Cart> = new Map();
  private utils: Map<string, CartUtils> = new Map(); // Track utils instances
  private lastCartId: number = 0;

  createCart(): string {
    const cartId = `cart_${++this.lastCartId}`;
    this.carts.set(cartId, new Cart());
    return cartId;
  }

  addItem(
    cartId: string,
    productId: string,
    quantity: number = 1,
    price: number
  ): void {
    const cart = this.carts.get(cartId);
    if (!cart) return;
    cart.addItem(productId, quantity, price);
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
  getCartUtils(cartId: string): CartUtils | undefined {
    const cart = this.carts.get(cartId);
    return cart ? new CartUtils(cart) : undefined;
  }

  clearCart(cartId: string): boolean {
    const cart = this.carts.get(cartId);
    if (!cart) return false;

    cart.clear();
    return true;
  }

  // Completely removes cart
  destroyCart(cartId: string): boolean {
    return this.carts.delete(cartId);
  }
}
