import React, { useState } from 'react';
import './App.css';

function App() {
  const storedAmount = localStorage.getItem('amount');
  const [amount, setAmount] = useState(storedAmount || '1000');
  const [hppData, setHppData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateHpp = async () => {
    setError(null);
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/hpp-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setHppData(data);
      localStorage.setItem('amount', amount);
    } catch (err) {
      setError(`Failed to generate payment: ${err.message}`);
      setHppData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (minorUnits) => {
    const num = Number(minorUnits);
    if (isNaN(num)) return '';
    return `€${(num / 100).toFixed(2)}`;
  };

  if (hppData) {
    return (
      <div className="container">
        <h1>Reg Gordon Test Checkout</h1>
        <h2>Checkout Summary</h2>
        <p><strong>Order ID:</strong> {hppData.orderId}</p>
        <p><strong>Amount:</strong> {formatAmount(hppData.amount)} {hppData.currency}</p>
        <form method="POST" action={hppData.hppUrl || 'https://pay.sandbox.realexpayments.com/pay'}>
          <input type="hidden" name="MERCHANT_ID" value={hppData.merchantId} />
          <input type="hidden" name="ACCOUNT" value={hppData.account} />
          <input type="hidden" name="ORDER_ID" value={hppData.orderId} />
          <input type="hidden" name="AMOUNT" value={hppData.amount} />
          <input type="hidden" name="CURRENCY" value={hppData.currency} />
          <input type="hidden" name="TIMESTAMP" value={hppData.timestamp} />
          <input type="hidden" name="SHA1HASH" value={hppData.sha1} />
          <input
              type="hidden"
              name="MERCHANT_RESPONSE_URL"
              value="http://localhost:3000/result.html"
          />
          <button type="submit">Pay Now</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Reg Gordon Test Checkout</h1>
      <label htmlFor="amountInput">Amount (in cents)</label>
      <input
        id="amountInput"
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
      />

      {error && <p className="error-message">{error}</p>}

      <button onClick={generateHpp} disabled={loading}>
        {loading ? 'Processing…' : 'Generate Checkout'}
      </button>

      <div className="note">
        <p><strong>Note:</strong> Amount is in minor currency units (cents). For example, enter 1000 for €10.00.</p>
      </div>
    </div>
  );
}

export default App;
