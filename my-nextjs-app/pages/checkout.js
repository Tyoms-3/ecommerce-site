// pages/checkout.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "EUR",
};

const CheckoutPage = () => {
  const [cart, setCart] = useState([]); // État pour le panier
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs
  const router = useRouter();
  
  useEffect(() => {
    // Fonction pour récupérer les données du panier
    const fetchCartData = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du panier:', error);
        setError('Erreur lors de la récupération du panier');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box p={4}>
      <Text fontSize="2xl">Checkout</Text>
      <Box>
        {cart.map(item => (
          <Box key={item.id} mb={4}>
            <Text>{item.name} - €{item.price}</Text>
          </Box>
        ))}
      </Box>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: cart.reduce((total, item) => total + item.price, 0).toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            alert('Transaction completed by ' + details.payer.name.given_name);
          }}
        />
      </PayPalScriptProvider>
    </Box>
  );
};

export default CheckoutPage;
