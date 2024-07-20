// pages/_app.js

import { ChakraProvider, Box } from '@chakra-ui/react';
import '../styles/globals.css';
import Bandeau from '../components/Bandeau';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Bandeau />
      <Box mt="70px"> {/* Marge en haut pour éviter que le contenu soit masqué */}
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
