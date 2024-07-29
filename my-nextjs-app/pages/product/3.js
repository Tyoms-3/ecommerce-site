import Head from 'next/head';
import Image from 'next/image';
import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// Supprimer l'importation de styles car il n'y a pas de fichier CSS module Home.module.css
// import styles from '../../styles/Home.module.css'; 

export default function Product3() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/'); // Redirige vers la page d'accueil ou vers la liste des produits
  };

  return (
    <Box className="productPage"> {/* Utilisation des classes globales */}
      <Head>
        <title>Pyjama Personnalisé - OneTMD</title>
      </Head>
      <Box>
        <Image src="/image3.jpg" alt="Pyjama Personnalisé" className="productImage" /> {/* Assurez-vous que ces classes existent dans global.css */}
        <Box className="productDetails">
          <Text as="h1" fontSize="2xl" fontWeight="bold">Pyjama Personnalisé</Text>
          <Text className="price">€30.00</Text>
          <Text mt={4}>Description du produit 3.</Text>
          <Box mt={4} className="colorOptions">
            <Text as="h3" fontSize="lg" fontWeight="bold">Options de Couleur:</Text>
            <div style={{ backgroundColor: '#FF0000', width: '30px', height: '30px', display: 'inline-block', marginRight: '10px' }}></div>
            <div style={{ backgroundColor: '#00FF00', width: '30px', height: '30px', display: 'inline-block', marginRight: '10px' }}></div>
            <div style={{ backgroundColor: '#0000FF', width: '30px', height: '30px', display: 'inline-block', marginRight: '10px' }}></div>
          </Box>
          <Box className="embroideryOptions">
            <Text as="h3" fontSize="lg" fontWeight="bold">Options de Broderie:</Text>
            <label><input type="checkbox" /> Nom</label>
            <label><input type="checkbox" /> Message</label>
          </Box>
          <textarea placeholder="Ajouter une personnalisation (facultatif)" rows="4" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}></textarea>
          <Button mt={4} colorScheme="teal">Ajouter au Panier</Button>
          <Button mt={4} className="buttonBack" onClick={handleBackClick}>Retour aux Produits</Button>
        </Box>
      </Box>
    </Box>
  );
}
