// A clean working HPP version with POST /hpp-init and camelCase keys

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import crypto from 'crypto';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/hpp-init', (req, res) => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const timestamp =
    now.getUTCFullYear().toString() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate()) +
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds());

  const orderId = `ORDER-${timestamp}`;
  const amount = req.body.amount || '1000'; // 10 EUR in minor units

  const { MERCHANT_ID, ACCOUNT_ID, CURRENCY, SECRET, HPP_URL } = process.env;
  const responseUrl = 'http://localhost:3000/result.html';

  const toHash = `${timestamp}.${MERCHANT_ID}.${orderId}.${amount}.${CURRENCY}.${SECRET}`;
  const hash1 = crypto.createHash('sha1').update(toHash).digest('hex');
  const finalHash = crypto.createHash('sha1').update(hash1).digest('hex');

  console.log('\n--- [HPP POST INIT DEBUG] ---');
  console.log({ timestamp, orderId, amount, toHash, hash1, finalHash });

  res.json({
    merchantId: MERCHANT_ID,
    account: ACCOUNT_ID,
    orderId,
    amount,
    currency: CURRENCY,
    timestamp,
    sha1: finalHash,
    merchantResponseUrl: responseUrl,
    hppUrl: HPP_URL,

    // Include uppercase versions for form use
    MERCHANT_ID,
    ACCOUNT: ACCOUNT_ID,
    ORDER_ID: orderId,
    AMOUNT: amount,
    CURRENCY,
    TIMESTAMP: timestamp,
    SHA1HASH: finalHash,
    MERCHANT_RESPONSE_URL: responseUrl,
    HPP_URL
  });
});

app.listen(5001, () => {
  console.log('✅ HPP backend running on http://localhost:5001');
});
