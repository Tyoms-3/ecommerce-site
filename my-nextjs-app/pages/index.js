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
        <Box className="bandeau">
          <img src="/logo.png" alt="Logo One TMD" />
          <Text fontSize="xl" fontWeight="bold">One TMD</Text>
        </Box>
        {/* Contenu principal */}
        <Box p={5}>
          <Text fontSize="xl">Welcome to OneTMD E-commerce!</Text>
          {/* Image de fond */}
          <Box
            className="background-image"
            h="300px"
            backgroundImage="url('/background-image.jpg')" // Remplacez par votre image de fond
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            mb={5}
          >
            <Box bg="rgba(0,0,0,0.5)" h="100%">
              <Text fontSize="2xl" color="white" fontWeight="bold" textAlign="center" mt="40%">
                L'attention à portée de main
              </Text>
              <Text fontSize="lg" color="white" textAlign="center">
                Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.
              </Text>
            </Box>
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
