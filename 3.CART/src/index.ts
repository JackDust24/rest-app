import { FixedDiscount, PercentageDiscount } from './models/Discount';
import { Freebie } from './models/Freebie';
import { CartService } from './services/cartService';
import { CartUtils } from './utils/cartUtils';

function runDemo() {
  console.log('=== Cart Service Demo ===\n');

  const cartService = new CartService();

  // 1. Create cart
  const cartId = cartService.createCart();
  console.log(`Created cart: ${cartId}`);

  const cartUtils = new CartUtils(cartService.getCart(cartId));

  const products = [
    { id: 'prod1', price: 100, quantity: 20 },
    { id: 'prod2', price: 200, quantity: 10 },
  ];

  const prod1 = products[0];
  const prod2 = products[1];
  const productPrices = { prod1: prod1.price, prod2: prod2.price };

  console.log('Initial Cart:');
  console.log('Is Cart Empty?:', cartUtils.isCartEmpty());

  // Add items
  console.log(
    'Add Itmes to Cart: prod1 x 20 ($100 each), prod2 x 10 ($200 each)'
  );

  cartService.addItem(cartId, prod1.id, prod1.quantity);
  cartService.addItem(cartId, prod2.id, prod2.quantity);

  const freebie = new Freebie(prod1.id, 'product_free', 1);
  cartService.addFreebieRule(cartId, freebie);

  console.log('Check Cart:');
  console.log('Is Cart Empty?:', cartUtils.isCartEmpty());
  console.log('List Cart items:', cartUtils.listItems());

  console.log(
    `isProductInCart ${prod1.id} in cart?`,
    cartUtils.isProductInCart(prod1.id)
  );
  console.log(
    'isProductInCart prod3 in cart?',
    cartUtils.isProductInCart('prod3')
  );
  console.log('Unique Items:', cartUtils.countUniqueItems());
  console.log('Total Quantity of Items:', cartUtils.getTotalQuantity());
  console.log('Total:', cartUtils.calculateTotal(productPrices));

  //   // Apply freebie
  //   cartService.applyFreebieToCart(cartId, 'p1', 'p3');
  //   console.log('\nAfter freebie (buy p1 get p3 free):');
  //   console.log('Items:', utils.listItems());
  //   console.log('New Subtotal:', utils.calculateSubtotal(productPrices));
  //   console.log('New Total:', utils.calculateTotal(productPrices));

  // Update item
  console.log('Before Updating prod1 with 20 items');

  cartService.updateItem(cartId, prod1.id, 40);
  console.log('\nAfter Updating prod1 with 40 more items:');
  console.log('Cart items:', cartUtils.listItems());
  console.log('Total:', cartUtils.calculateTotal(productPrices));

  console.log('\nApply $10 discount:');

  cartService.applyDiscount(cartId, new FixedDiscount('FLAT10', 150));
  console.log(
    'Total after Fixed Discount:',
    cartUtils.calculateTotal(productPrices)
  );

  console.log('\nApply 20% discount with $50 max:');

  cartService.applyDiscount(cartId, new PercentageDiscount('PERC20', 20, 120));
  console.log(
    'Total after percentage discount:',
    cartUtils.calculateTotal(productPrices)
  );

  console.log('\nRemove Percentage discount by name');
  cartService.removeDiscountFromCart(cartId, 'PERC20');
  console.log(
    'Total after removing discount:',
    cartUtils.calculateTotal(productPrices)
  );

  // Remove item
  console.log('\nRemove Item Prod1 from Cart');

  cartService.removeItem(cartId, prod1.id);
  console.log('\nAfter removing Prod1:');
  console.log('Items:', cartUtils.listItems());
  console.log('Total:', cartUtils.calculateTotal(productPrices));

  console.log('\nDestroy the  Cart');
  cartService.clearCart(cartId);
  console.log(
    '\nCart destroyed. Is cart empty now?',
    cartService.getCart(cartId) === undefined
  );
}

runDemo();
