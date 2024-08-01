import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

const initialOptions = {
  clientId: clientId,
  currency: "EUR",
};

const PaypalButton = () => {
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
          const details = await actions.order.capture();
          console.log("Transaction completed by " + details.payer.name.given_name);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
