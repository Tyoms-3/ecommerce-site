import Head from 'next/head';
import Image from 'next/image';
import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'; // Assurez-vous que le chemin est correct

export default function Product3() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/'); // Redirige vers la page d'accueil ou vers la liste des produits
  };

  return (
    <Box className={styles.productPage}>
      <Head>
        <title>Pyjama Personnalisé - OneTMD</title>
      </Head>
      <Box>
        <Image src="/image3.jpg" alt="Pyjama Personnalisé" className={styles.productImage} />
        <Box className={styles.productDetails}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">Pyjama Personnalisé</Text>
          <Text className={styles.price}>€30.00</Text>
          <Text mt={4}>Description du produit 3.</Text>
          <Box mt={4} className={styles.colorOptions}>
            <Text as="h3" fontSize="lg" fontWeight="bold">Options de Couleur:</Text>
            <div style={{ backgroundColor: '#FF0000' }}></div>
            <div style={{ backgroundColor: '#00FF00' }}></div>
            <div style={{ backgroundColor: '#0000FF' }}></div>
          </Box>
          <Box className={styles.embroideryOptions}>
            <Text as="h3" fontSize="lg" fontWeight="bold">Options de Broderie:</Text>
            <label><input type="checkbox" /> Nom</label>
            <label><input type="checkbox" /> Message</label>
          </Box>
          <textarea placeholder="Ajouter une personnalisation (facultatif)" rows="4"></textarea>
          <Button mt={4} colorScheme="teal">Ajouter au Panier</Button>
          <Button mt={4} className={styles.buttonBack} onClick={handleBackClick}>Retour aux Produits</Button>
        </Box>
      </Box>
    </Box>
  );
}
