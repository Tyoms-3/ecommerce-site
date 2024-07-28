import Head from 'next/head';
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
