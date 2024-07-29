import Head from 'next/head';
import { Box, Text, Button, Image, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import '../../styles/globals.css'; // Assurez-vous que le chemin est correct

const Product2 = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  const basePrices = {
    1: 20.00,
    2: 25.00,
    3: 30.00,
  };

  const [price, setPrice] = useState(basePrices[id] || 0);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');

  const handleColorChange = (color) => {
    setColor(color);
    // Ajoutez la logique pour changer l'image en fonction de la couleur
  };

  const handleEmbroideryChange = (type) => {
    setEmbroidery(type);
    let additionalCost = 0;
    switch (type) {
      case 'double_broderie_grande_et_petite':
        additionalCost = 3.5;
        break;
      case 'double_broderie_grande':
        additionalCost = 5.0;
        break;
      case 'double_broderie_petite':
        additionalCost = 2.0;
        break;
      default:
        additionalCost = 0;
    }
    setPrice(basePrices[id] + additionalCost);
  };

  const handlePayment = () => {
    // Redirection vers PayPal avec la clé API
    // Remplacez 'YOUR_PAYPAL_API_KEY' par votre clé API réelle
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_API_KEY&amount=${price}&currency_code=EUR&item_name=Produit ${id}`;
  };

  return (
    <Box bg="black" color="white" minHeight="100vh" p={5}>
      <Head>
        <title>{product.name} - OneTMD</title>
      </Head>

      <Button onClick={() => router.push('/product')}>Retour à la section des produits</Button>

      <Box mt={5}>
        <Text fontSize="2xl">{product.name}</Text>
        <Image src={product.image} alt={product.name} width={300} height={300} />
        <Text mt={3}>Prix de base : €{basePrices[id]}</Text>
        <Text mt={3}>Choisir une couleur :</Text>
        <Box>
          {product.colors.map(colorOption => (
            <Button key={colorOption} onClick={() => handleColorChange(colorOption)}>{colorOption}</Button>
          ))}
        </Box>
        <Text mt={3}>Choisir une broderie :</Text>
        <Box>
          {product.embroideryOptions.map(option => (
            <Button key={option.type} onClick={() => handleEmbroideryChange(option.type)}>{option.label}</Button>
          ))}
        </Box>
        <Text mt={3}>Prix final : €{price.toFixed(2)}</Text>
        <Text mt={3}>Préciser la position souhaitée de(s) broderie(s) :</Text>
        <Input placeholder="Position des broderies" />
        <Button mt={4} onClick={handlePayment}>Payer maintenant</Button>
      </Box>
    </Box>
  );
};

// Simuler les données du produit pour l'exemple
export async function getServerSideProps(context) {
  const { id } = context.query;
  // En fonction de l'ID, récupérez les détails du produit depuis une source de données
  const products = {
    1: {
      name: 'Sweat Personnalisé',
      image: '/image3-fond.jpg',
      colors: ['Rouge', 'Bleu', 'Vert'],
      embroideryOptions: [
        { type: 'double_broderie_grande_et_petite', label: 'Double broderie grande et petite (+€3.5)' },
        { type: 'double_broderie_grande', label: 'Double broderie grande (+€5.0)' },
        { type: 'double_broderie_petite', label: 'Double broderie petite (+€2.0)' },
      ]
    },
    2: {
      name: 'Pull Personnalisé',
      image: '/image2.jpg',
      colors: ['Rouge', 'Bleu', 'Vert'],
      embroideryOptions: [
        { type: 'double_broderie_grande_et_petite', label: 'Double broderie grande et petite (+€3.5)' },
        { type: 'double_broderie_grande', label: 'Double broderie grande (+€5.0)' },
        { type: 'double_broderie_petite', label: 'Double broderie petite (+€2.0)' },
      ]
    },
    // Ajoutez d'autres produits ici
  };

  return {
    props: {
      product: products[id] || {},
    },
  };
}

export default Product2;
