// pages/checkout.js
import React from 'react';
import PaypalButton from '../components/PayPalButton'; // Assurez-vous que le chemin est correct

const Checkout = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <p>Voici votre panier et les options de paiement :</p>
      <PaypalButton />
    </div>
  );
};

export default Checkout;
