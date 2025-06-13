## Environment Variables (`.env`) Setup

This project requires a `.env` file in the project root with your sensitive configuration.

### Required Variables

| Variable    | Description                             | Example                                          |
|-------------|-------------------------------------|-------------------------------------------------|
| MERCHANT_ID | Your Global Payments merchant ID    | `MERCHANT_ID=regtest`                            |
| ACCOUNT     | Your account ID                     | `ACCOUNT=wallets`                                |
| SECRET      | Secret key for SHA1 hashing         | `SECRET=2A9wkRXR6w`                              |
| CURRENCY    | Currency code, uppercase only       | `CURRENCY=EUR`                                   |
| HPP_URL     | Hosted Payment Page endpoint URL    | `HPP_URL=https://pay.sandbox.realexpayments.com/pay` |

---

### Important Notes

- **Do not commit your `.env` file** to version control. This file contains secrets.
- Use the `.env.example` file as a template.
- Add `.env` to your `.gitignore` to prevent accidental commits.

---

### How to Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env


## Test Cards
Use test card data from Global Payments documentation.

## Notes
- This project uses React to render the Hosted Fields via the Global Payments JS SDK.
- The Express server generates the token and handles charging the nonce.
