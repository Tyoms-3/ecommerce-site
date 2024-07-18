import Head from 'next/head';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <ChakraProvider>
      <Box>
        <Head>
          <title>OneTMD - E-commerce</title>
        </Head>
        {/* Bandeau */}
        <Box className="bandeau" textAlign="center" py={4} bg="black" color="white">
          <img src="/logo.png" alt="Logo One TMD" style={{ width: '100px', height: 'auto' }} />
          <Text fontSize="2xl" fontWeight="bold">One TMD</Text>
        </Box>
        {/* Contenu principal */}
        <Box p={5}>
          <Text fontSize="xl">Welcome to OneTMD E-commerce!</Text>
          {/* Contenu principal */}
          <Box mb={5}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mt={10}>
              L'attention à portée de main
            </Text>
            <Text fontSize="lg" textAlign="center" mt={3}>
              Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.
            </Text>
          </Box>
          {/* Autre contenu de votre site */}
          <Text fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo sagittis ipsum eu hendrerit. Nulla in ligula in arcu consequat ultricies. Donec vitae nisl aliquam, aliquet neque vel, condimentum lectus. Morbi varius purus ac erat vehicula dictum. Nulla facilisi.
          </Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
