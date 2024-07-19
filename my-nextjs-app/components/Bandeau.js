// components/Bandeau.js

import React from 'react';
import { Box, Flex, IconButton, Heading, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Stack, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styles from '../styles/Bandeau.module.css'; // Importez le CSS module

const Bandeau = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className={styles.bandeau} bg="black" color="white" p={4}>
      <Flex justify="space-between" align="center" w="100%">
        {/* Menu Hamburger */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="outline"
          colorScheme="whiteAlpha"
          onClick={onOpen}
        />
        {/* Titre centré */}
        <Heading as="h1" size="lg" className={styles.titrePrincipal}>
          One TMD
        </Heading>
        {/* Logo aligné à droite */}
        <img src="/logo.png" alt="Logo One TMD" className={styles.logo} />
      </Flex>

      {/* Menu Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} mt={8}>
              <Text fontSize="xl">Page 1</Text>
              <Text fontSize="xl">Page 2</Text>
              <Text fontSize="xl">Page 3</Text>
              {/* Ajoutez des liens ou d'autres éléments de menu ici */}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Bandeau;
