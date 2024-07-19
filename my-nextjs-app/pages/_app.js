// pages/_app.js

import '../styles/globals.css'; // Importation des styles globaux
import { ChakraProvider } from '@chakra-ui/react';
import Bandeau from '../components/Bandeau'; // Importer le composant Bandeau

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Bandeau /> {/* Ajouter le bandeau ici */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

