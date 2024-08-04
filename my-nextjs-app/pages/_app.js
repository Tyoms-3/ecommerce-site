// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Head from 'next/head';
import { extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';  // Import des styles globaux

// Configuration du thème Chakra UI
const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7c6c7',
      900: '#1a202c',
    },
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
});

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "EUR",
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PayPalScriptProvider options={initialOptions}>
        <Head>
          <title>One TMD</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </ChakraProvider>
  );
}

export default MyApp;
