import Head from 'next/head';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Box>
      <Head>
        <title>OneTMD - E-commerce</title>
      </Head>
      
      {/* Section principale avec image de fond */}
      <Box className="sectionPrincipale" position="relative" overflow="hidden">
        <Box className="contenuTexte" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" textAlign="center" color="white" p={4}>
          <Text className="titrePrincipal" fontSize={{ base: '6vw', md: '5vw', lg: '4vw' }} fontWeight="bold">
            L'attention à portée de main
          </Text>
          <Text className="slogan" fontSize={{ base: '3vw', md: '2.5vw', lg: '2vw' }} mt={2}>
            Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.
          </Text>
        </Box>
      </Box>
      
      {/* Section des produits */}
      <Box className="newSection" display="flex" flexWrap="wrap" justifyContent="space-around" p={4}>
        <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center" width={{ base: '90%', sm: '45%', md: '30%' }} mb={4}>
          <Image src="/image3-fond.jpg" alt="Sweat Personnalisé" borderRadius="md" />
          <Text as="h3" fontSize="xl" mt={2}>Sweat Personnalisé</Text>
          <Text mt={2}>Description du produit 1.</Text>
          <Text className="price" mt={2} fontSize="lg">€20.00</Text>
          <Button mt={4} onClick={() => handleProductClick(1)} colorScheme="teal">Voir plus</Button>
        </Box>

        <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center" width={{ base: '90%', sm: '45%', md: '30%' }} mb={4}>
          <Image src="/image2.jpg" alt="Pyjama Personnalisé" borderRadius="md" />
          <Text as="h3" fontSize="xl" mt={2}>Pyjama Personnalisé</Text>
          <Text mt={2}>Description du produit 2.</Text>
          <Text className="price" mt={2} fontSize="lg">€25.00</Text>
          <Button mt={4} onClick={() => handleProductClick(2)} colorScheme="teal">Voir plus</Button>
        </Box>

        {/* Ajoutez d'autres cartes de produit ici */}
      </Box>
    </Box>
  );
}

