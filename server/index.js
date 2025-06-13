import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import crypto from 'crypto';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

function sha1hash(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

app.post('/hpp-init', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const orderId = `ORDER-${Date.now()}`;
  const amount = req.body.amount;
  const currency = 'EUR';
  const secret = process.env.SECRET;
  const merchantId = process.env.MERCHANT_ID;
  const account = process.env.ACCOUNT;

  const hash = sha1hash(`${timestamp}.${merchantId}.${orderId}.${amount}.${currency}`);
  const sha1 = sha1hash(`${hash}.${secret}`);

  res.json({
    timestamp,
    orderId,
    amount,
    currency,
    merchantId,
    account,
    sha1
  });
});

app.post('/lightbox-init', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const orderId = `ORDER-LB-${Date.now()}`;
  const amount = req.body.amount;
  const currency = 'EUR';
  const secret = process.env.SECRET;
  const merchantId = process.env.MERCHANT_ID;
  const account = process.env.ACCOUNT;

  const hash = sha1hash(`${timestamp}.${merchantId}.${orderId}.${amount}.${currency}`);
  const sha1 = sha1hash(`${hash}.${secret}`);

  res.json({
    timestamp,
    orderId,
    amount,
    currency,
    merchantId,
    account,
    sha1
  });
});

app.listen(5001, () => {
  console.log('HPP backend running at http://localhost:5001');
});
