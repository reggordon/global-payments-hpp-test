import React, { useState } from 'react';

function Lightbox() {
  const [lightboxData, setLightboxData] = useState(null);

  const launchLightbox = async () => {
    try {
      const res = await fetch('/lightbox-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: '1000' }) // you can replace or add an input for amount
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setLightboxData(data);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://pay.sandbox.realexpayments.com/pay';
      form.style.display = 'none';

      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      addField('MERCHANT_ID', data.merchantId);
      addField('ACCOUNT', data.account);
      addField('ORDER_ID', data.orderId);
      addField('AMOUNT', data.amount);
      addField('CURRENCY', data.currency);
      addField('TIMESTAMP', data.timestamp);
      addField('SHA1HASH', data.sha1);
      addField('AUTO_SETTLE_FLAG', '1');
      addField('HPP_VERSION', '2');
      addField('HPP_SELECT_STYLES', 'Y');
      addField('HPP_RESPONSE_MODE', 'lightbox');

      document.body.appendChild(form);

      const script = document.createElement('script');
      script.src = 'https://pay.sandbox.realexpayments.com/pay';
      document.body.appendChild(script);

      script.onload = () => {
        form.submit();
      };
    } catch (error) {
      console.error('Error loading HPP data:', error);
    }
  };

  return (
    <div>
      <h1>Lightbox Checkout</h1>
      <button onClick={launchLightbox}>Pay with Lightbox</button>
    </div>
  );
}

export default Lightbox;
