import Head from 'next/head';
import { Box, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <Head>
        <title>OneTMD - E-commerce</title>
      </Head>
      {/* Contenu principal */}
      <Box>
        <Text fontSize="xl"></Text>
        {/* Section avec image de fond */}
        <Box className="sectionPrincipale">
          <Box className="contenuTexte">
            <Text className="titrePrincipal">L'attention à portée de main</Text>
            <Text className="slogan">Exprimez votre amour en offrant et partageant des moments précieux et uniques où chaque détail compte.</Text>
          </Box>
        </Box>

        {/* Nouvelle section */}
        <Box className="newSection">
          <Box className="card">
            <img src="/path/to/image1.jpg" alt="Product 1" />
            <h3>Produit 1</h3>
            <p>Description du produit 1.</p>
            <p className="price">€100</p>
          </Box>
          <Box className="card">
            <img src="/path/to/image2.jpg" alt="Product 2" />
            <h3>Produit 2</h3>
            <p>Description du produit 2.</p>
            <p className="price">€200</p>
          </Box>
          <Box className="card">
            <img src="/path/to/image3.jpg" alt="Product 3" />
            <h3>Produit 3</h3>
            <p>Description du produit 3.</p>
            <p className="price">€300</p>
          </Box>
        </Box>
    </Box>
  );
}
