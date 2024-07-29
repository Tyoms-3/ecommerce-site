import Head from 'next/head';
import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';

export default function Home() {
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
            <Image src="/image1.jpg" alt="Sweat personnalisé" width={200} height={200} />
            <Text as="h3" fontSize="xl" mt={2}>Sweat Personnalisé</Text>
            <Text mt={2}>Description du produit 1.</Text>
            <Text className="price" mt={2} fontSize="lg">€20.00</Text>
          </Box>

          <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center">
            <Image src="/image2.jpg" alt="" width={200} height={200} />
            <Text as="h3" fontSize="xl" mt={2}>Pull personnalisé</Text>
            <Text mt={2}>Description du produit 2.</Text>
            <Text className="price" mt={2} fontSize="lg">€25.00</Text>
          </Box>

          <Box className="card" bg="white" borderWidth={1} borderRadius="md" p={4} textAlign="center">
            <Image src="/image3.jpg" alt="" width={200} height={200} />
            <Text as="h3" fontSize="xl" mt={2}>Pyjama personnalisé</Text>
            <Text mt={2}>Description du produit 3.</Text>
            <Text className="price" mt={2} fontSize="lg">€30.00</Text>
          </Box>
        </Box>
        {/* Autre contenu de votre site */}
        <Box p={5}> {/* Ajoutez padding ici pour le contenu en dessous de la sectionPrincipale */}
          <Text fontSize="lg" mt={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo sagittis ipsum eu hendrerit. Nulla in ligula in arcu consequat ultricies. Donec vitae nisl aliquam, aliquet neque vel, condimentum lectus. Morbi varius purus ac erat vehicula dictum. Nulla facilisi.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

