// components/Bandeau.js

import React from 'react';
import Headroom from 'react-headroom';
import {
  Box,
  Flex,
  IconButton,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styles from '../styles/Bandeau.module.css';

const Bandeau = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <Box className={styles.bandeau} bg="black" color="white" p={4}>
        <Flex justify="space-between" align="center" w="100%">
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="outline"
            colorScheme="whiteAlpha"
            onClick={onOpen}
          />
          <Heading as="h1" size="lg" className={styles.titrePrincipal}>
            One TMD
          </Heading>
          <img src="/logo.png" alt="Logo One TMD" className={styles.logo} />
        </Flex>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Stack spacing={4} mt={8}>
                <Text fontSize="xl">Page 1</Text>
                <Text fontSize="xl">Page 2</Text>
                <Text fontSize="xl">Page 3</Text>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Headroom>
  );
};

export default Bandeau;

