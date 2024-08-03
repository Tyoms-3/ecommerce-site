// components/PaypalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const initialOptions = {
  "client-id": clientId,
  currency: "EUR",
};

const PaypalButton = ({ cart }) => {
  if (!cart || cart.length === 0) {
    return <div>Le panier est vide.</div>; // Affiche un message si le panier est vide
  }

  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.finalPrice), 0).toFixed(2);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount, // Montant total calculé avec personnalisations
                },
                description: `Commande de ${cart.length} articles`,
                items: cart.map(item => ({
                  name: item.name,
                  description: `Couleur: ${item.customizations.color}, Brodure: ${item.customizations.border}`,
                  unit_amount: {
                    currency_code: "EUR",
                    value: item.finalPrice,
                  },
                  quantity: 1,
                })),
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log("Transaction completed by " + details.payer.name.given_name);
            // Vous pouvez également ajouter une redirection ou une confirmation ici
          } catch (error) {
            console.error("Erreur lors de la capture de la commande:", error);
          }
        }}
        onError={(error) => {
          console.error("Erreur PayPal:", error);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
