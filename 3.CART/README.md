### REST APP for User Profile

# Commerce Service - CART APP

## Overview

This project writes a service called Cart which serves as a cart that can breated, adding products to the cart, setting discounts and freebie items.

## IMPORTANT NOTE

This project does not contain state or a database.

## File Structure

```bash
src/
├── models/
│   ├── Cart.ts // Define the Cart class
│   ├── Discount.ts // Define the Discount Class for two different types of discount
│   ├── Freebie.ts // Define the Freebie Class
├── servies/
│   ├── cartService.ts // The business logic for managing the cart service
├── utils/
│   └── cartUtils.ts // Utility functions for running queries against the cart
│   └── helper.ts // Small helper file with reusable function
│   └── timeoutManager.ts // A simple timeout class for running the demo so the display looks clean when running the demo
└── index.ts // For running the demo
```

### Prerequisites

- Node.js installed
- `npm install`

### Run the demo

```sh
npm run dev
```


## License

MIT License

