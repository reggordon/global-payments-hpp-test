
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
   ```

2. Edit `.env` and fill in your actual merchant credentials.

---

## Test Cards

Use test card data from Global Payments documentation.

---

## Notes

- This project uses React to render the Hosted Fields via the Global Payments JS SDK.
- The Express server generates the token and handles charging the nonce.

---

# Optional Global Payments HPP Parameters

The Global Payments Hosted Payment Page (HPP) supports several optional fields to customize your payment requests.

These parameters can be added as **hidden inputs** inside your payment form (`App.js` or equivalent):

```jsx
{/* Example: Add these inside your <form> */}
{/* <input type="hidden" name="AUTO_SETTLE_FLAG" value="1" /> */}
{/* <input type="hidden" name="ORDER_DESCRIPTION" value="Order #1234" /> */}
{/* <input type="hidden" name="EMAIL" value="customer@example.com" /> */}
{/* <input type="hidden" name="BILLING_ADDRESS1" value="123 Main St" /> */}
{/* <input type="hidden" name="HPP_LANG" value="en" /> */}
```

## Common optional fields include:

- `AUTO_SETTLE_FLAG`: Auto-settle the transaction (1 = yes)  
- `ORDER_DESCRIPTION`: Text description of the order  
- `EMAIL`: Customer’s email address  
- `BILLING_ADDRESS1`, `BILLING_CITY`, `BILLING_POSTCODE`, `BILLING_COUNTRY`: Billing address details  
- `SHIPPING_ADDRESS1`, etc.: Shipping address details  
- `HPP_LANG`: UI language for the HPP (e.g., "en")  
- `MERCHANT_CUSTOMER_REFERENCE`: Your internal customer ID or reference  

## Where to add?

Uncomment these **inside the `<form>`** that submits to the HPP URL, alongside the required fields like `MERCHANT_ID` and `SHA1HASH`.

---

> **Note:** Uncomment and fill only the fields relevant to your integration. Check with your acquirer if any fields require special setup.

---

## To Run the App

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

```bash
cd ../client
npm install
```

### 3. Create and configure `.env` for backend

```bash
cd ../server
cp .env.example .env
```

Edit `.env` to add your merchant credentials.

---

### 4. Start the backend server

```bash
node index.js
```

### 5. Start the frontend server (in a new terminal window/tab)

```bash
cd ../client
npm start
```

### 6. Open your browser and navigate to:

```
http://localhost:3000
```

---

### Notes:

- Backend listens on port `5001` by default.
- Frontend proxies API requests to backend automatically.
- Ensure ports 3000 and 5001 are free before starting servers.
