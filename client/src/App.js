import React, { useState } from 'react';

function App() {
  const [hppData, setHppData] = useState(null);

  const generateHpp = async () => {
    const res = await fetch('http://localhost:5001/hpp-init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: '1000' })
    });
    const data = await res.json();
    setHppData(data);
  };

  return (
    <div>
      <h1>HPP Demo</h1>
      {!hppData && <button onClick={generateHpp}>Pay with HPP</button>}

      {hppData && (
        <form method="POST" action="https://pay.sandbox.realexpayments.com/pay">
          <input type="hidden" name="MERCHANT_ID" value={hppData.merchantId} />
          <input type="hidden" name="ACCOUNT" value={hppData.account} />
          <input type="hidden" name="ORDER_ID" value={hppData.orderId} />
          <input type="hidden" name="AMOUNT" value={hppData.amount} />
          <input type="hidden" name="CURRENCY" value={hppData.currency} />
          <input type="hidden" name="TIMESTAMP" value={hppData.timestamp} />
          <input type="hidden" name="SHA1HASH" value={hppData.sha1} />
          <button type="submit">Proceed to Payment</button>
        </form>
      )}
    </div>
  );
}

export default App;
