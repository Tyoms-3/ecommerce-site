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
      {/* Contenu principal */}
      <Box p={0}> {/* Retirez le padding ici pour ne pas affecter la sectionPrincipale */}
        <Text fontSize="xl"></Text>
        {/* Section avec image de fond */}
        <Box className="sectionPrincipale">
          <Box className="contenuTexte">
            <Text className="titrePrincipal">L'attention à portée de main</Text>
            <Text className="slogan">Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.</Text>
          </Box>
        </Box>
        {/* Section des boîtes */}
        <Box className="newSection" display="flex" justifyContent="space-around" p={4}>
          <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center">
            <Image src="/image3-fond.jpg" alt="Sweat Personnalisé" />
            <Text as="h3" fontSize="xl" mt={2}>Sweat Personnalisé</Text>
            <Text mt={2}>Description du produit 1.</Text>
            <Text className="price" mt={2} fontSize="lg">€20.00</Text>
            <Button mt={4} onClick={() => handleProductClick(1)}>Voir plus</Button>
          </Box>

          <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center">
            <Image src="/image2.jpg" alt="Pyjama Personnalisé" />
            <Text as="h3" fontSize="xl" mt={2}>Pyjama Personnalisé</Text>
            <Text mt={2}>Description du produit 2.</Text>
            <Text className="price" mt={2} fontSize="lg">€25.00</Text>
            <Button mt={4} onClick={() => handleProductClick(2)}>Voir plus</Button>
          </Box>

          {/* Ajoutez d'autres cartes de produit ici */}
        </Box>
      </Box>
    </Box>
  );
}
