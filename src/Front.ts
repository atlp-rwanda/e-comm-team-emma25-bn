import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const publishable_key = '';

const authToken =
  'eyJhbGciOiJIUzI1NiJ9.YzQ3MjMzMmMtZGIwNC00NmMwLTgwYjktNDMxNWEyNmNjZjYz.eo1qWqQZ5lJ-_uboF8OaBGEyZHNHtCzc9yL_pYbgtvY';

const cartTotal = 7000;

export default function App() {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/v1/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: cartTotal,
            email: stripeToken.email,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    stripeToken && makePayment();
  }, [stripeToken]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: '#020917',
        color: 'white',
        fontFamily: 'courier',
      }}
    >
      <h2> 🌀 Team Cypher 🛍️ 🛒 E-commerce API 🪁 🧑‍🍳 🍽️ 🥬</h2>
      <StripeCheckout
        name="Team Cypher - Ecommerce API" // the pop-in header title
        description="Testing Stripe" // the pop-in header subtitle
        image="https://i.pinimg.com/originals/37/b4/4a/37b44ad9eab55697007e8f4116944428.jpg" // the pop-in header image (default none)
        // amount={4000} // cents
        currency="USD"
        token={onToken}
        stripeKey={publishable_key}
      >
        <button
          style={{
            padding: '10px 40px',
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(3px)',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            fontWeight: '600',
            justifyContent: 'center',
          }}
        >
          Pay
        </button>
      </StripeCheckout>
    </div>
  );
}
