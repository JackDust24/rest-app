import { FixedDiscount, PercentageDiscount } from './models/Discount';
import { Freebie } from './models/Freebie';
import { CartService } from './services/cartService';
import { TimeoutManager } from './utils/timeoutManager';
import { convertToCurrency } from './utils/helper';

async function runDemo() {
  // 0. Create Service
  const cartService = new CartService();
  // For demo purposes a pause between sections
  const timeout = new TimeoutManager();

  // 1. Create cart
  const cartId = cartService.createCart();
  // 1.1. Initiallise Cart Utils
  const cartUtils = cartService.getCartUtils(cartId)!;

  console.log('=== Cart Service Demo ===\n');
  console.log(`1. Created and initialise cart: ${cartId}`);
  await timeout.wait(2000);

  // 2. Check if Cart is Empty
  console.log(
    '\n2. UTILS - Is Cart Empty (initial check)?:',
    cartUtils.isCartEmpty()
  );
  await timeout.wait(2000);

  // Define Products
  const products = [
    { id: 'prod1', price: 100, quantity: 20 },
    { id: 'prod2', price: 200, quantity: 10 },
  ];

  const prod1 = products[0];
  const prod2 = products[1];

  // 3. Add Freebie to Cart if Prod1 is added
  console.log(`\n3. Add Freebie to cart due to ${prod1.id} being added`);

  const freebie = new Freebie(prod1.id, 'product_free', 1);
  cartService.addFreebieRule(cartId, freebie);
  console.log('Freebie being added ....');
  await timeout.wait(400);

  // 4. Add Product Items to Cart

  console.log(
    `\n4. Add Itmes to Cart: \n${prod1.id} x ${prod1.quantity}  ($${prod1.price} each), \n${prod2.id} x ${prod2.quantity}  ($${prod2.price} each)`
  );

  cartService.addItem(cartId, prod1.id, prod1.quantity, prod1.price);
  cartService.addItem(cartId, prod2.id, prod2.quantity, prod2.price);
  console.log('Adding items ....');
  await timeout.wait(400);

  console.log('Check Cart:');
  console.log(
    'Is Cart Empty check after adding Items?:',
    cartUtils.isCartEmpty()
  );
  console.log('List Cart items:', cartUtils.listItems());
  await timeout.wait(2000);

  // 5. Check Cart Items for product added
  console.log(
    `\n5. UTILS Check- Is product ${prod1.id} in cart (should return true)?`,
    cartUtils.isProductInCart(prod1.id)
  );
  // 5.1 Separate check for product ID, that does not exist
  console.log(
    '\n5.1  UTILS Check - Is invalid product "prod3" in cart (should return false)?',
    cartUtils.isProductInCart('prod3')
  );
  await timeout.wait(2000);

  // 6. Get Utils to count items, unique items, total quantity and calculate total
  console.log(
    '\n6. Utils check for count items, unique items, total quantity and calculate total:'
  );

  console.log('UTILS - Unique Items:', cartUtils.countUniqueItems());
  await timeout.wait(2000);

  console.log('UTILS - Total Quantity of Items:', cartUtils.getTotalQuantity());
  await timeout.wait(2000);

  console.log('UTILS - Total:', convertToCurrency(cartUtils.calculateTotal()));
  await timeout.wait(2000);

  // 7. Update Items in Cart
  console.log('\n7. Update cart with new quantity.');
  console.log(
    `BEFORE we update, product ${prod1.id}, has ${prod1.quantity}items`
  );
  console.log('Cart items check:', cartUtils.listItems());
  await timeout.wait(2000);

  console.log('\n7.1 Now we will update with 40 items.');

  cartService.updateItem(cartId, prod1.id, 40);
  await timeout.wait(2000);

  console.log(`\nAfter Updating ${prod1.id} with 40 more items:`);
  console.log('Cart items:', cartUtils.listItems());
  console.log('Check Total price after updating:', cartUtils.calculateTotal());
  await timeout.wait(2000);

  // 8. Apply Fixed Discounts
  console.log('\n8. Apply $150 FIXED discount:');

  cartService.applyDiscount(cartId, new FixedDiscount('FLAT150', 150));
  console.log('Applying discount ....');
  await timeout.wait(400);

  console.log(
    'Subtotal BEFORE discount:',
    convertToCurrency(cartUtils.calculateSubtotal())
  );
  console.log(
    'Total after Fixed Discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  // 9. Apply Percentage Discount
  console.log('\n9. Apply 20% discount with $100 maximum amount:');
  console.log('THIS TEST WILL DEFAULT TO MAX AMOUNT DEDUCTION');

  cartService.applyDiscount(cartId, new PercentageDiscount('PERC20', 20, 100));
  console.log('Applying discount ....');
  await timeout.wait(400);

  console.log(
    'Total after percentage discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  // 9.1 Apply Percentage Discount
  console.log('\n9.1 Apply 30% discount with $10000 maximum amount:');
  console.log(
    'THIS TEST WILL DEFAULT TO PERCENTAGE DEDUCTION as max amount is higher'
  );

  cartService.applyDiscount(
    cartId,
    new PercentageDiscount('PERC30', 30, 10000)
  );
  console.log('Applying discount ....');
  await timeout.wait(400);

  console.log(
    'Total after percentage discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  // 10. Remove Discount
  console.log('\n10. Remove Percentage discount by name');

  cartService.removeDiscountFromCart(cartId, 'PERC30');
  console.log('Removing discount ....');
  await timeout.wait(400);

  console.log(
    'Total after removing discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  // 11. Negative case check
  console.log(
    '\n11. Add a fixed discount of 10,000 that goes over the cart total - aim to not be a negative total'
  );

  cartService.applyDiscount(cartId, new FixedDiscount('FLAT10000', 10000));
  console.log('Applying discount ....');
  await timeout.wait(400);

  console.log(
    'Total after huge Fixed Discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  console.log('\n11.1 Remove previous discount');

  cartService.removeDiscountFromCart(cartId, 'FLAT10000');
  console.log('Removing discount ....');
  await timeout.wait(400);

  console.log(
    'Total after removing discount:',
    convertToCurrency(cartUtils.calculateTotal())
  );
  await timeout.wait(2000);

  console.log('Check Cart:');
  console.log(
    'List Cart items after Freebie product add:',
    cartUtils.listItems()
  );
  await timeout.wait(2000);

  // 12. Remove item
  console.log(`\n12. Remove Item ${prod2.id} from Cart`);

  cartService.removeItem(cartId, prod2.id);
  await timeout.wait(400);

  console.log(`\nAfter removing ${prod2.id}:`);
  console.log('Items:', cartUtils.listItems());
  console.log('Total:', convertToCurrency(cartUtils.calculateTotal()));
  await timeout.wait(2000);

  // 13. Destroy Cart
  console.log('\n13. Destroy the  Cart');

  // Clear the cart (keeps cart instance but empties it)
  console.log('\nClearing cart...');
  const didClear = cartService.clearCart(cartId);
  await timeout.wait(500);

  if (didClear) {
    console.log('Cart cleared. Items:', cartUtils.listItems());
    await timeout.wait(500);

    console.log('Is empty:', cartUtils.isCartEmpty());
    await timeout.wait(500);

    console.log('Check total quantity of items:', cartUtils.getTotalQuantity());
    await timeout.wait(500);
    console.log('Total:', convertToCurrency(cartUtils.calculateTotal()));
  } else {
    console.log('Cart not found');
  }

  // Later when completely done with cart:
  console.log('\nDestroying cart...');
  const didDestroy = cartService.destroyCart(cartId);
  await timeout.wait(500);

  if (didDestroy) {
    console.log('Cart destroyed. Trying to access:');
    console.log(cartService.getCartUtils(cartId)?.listItems() ?? 'Cart gone');
  }

  console.log('Demo completed.');
}

runDemo();
