# Global Payments Hosted Fields - React + Express Integration

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env # and fill in values
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

## Test Cards
Use test card data from Global Payments documentation.

## Notes
- This project uses React to render the Hosted Fields via the Global Payments JS SDK.
- The Express server generates the token and handles charging the nonce.
