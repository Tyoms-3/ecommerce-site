import React, { useState, useEffect } from 'react';
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
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box className={`${styles.bandeau} ${show ? styles.show : styles.hide}`} bg="black" color="white" p={4}>
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
  );
};

export default Bandeau;

