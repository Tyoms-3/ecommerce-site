import Head from 'next/head';
import { Box, Text, Button, Image, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Prix de base pour chaque produit
  const basePrices = {
    1: 20.00,
    2: 25.00,
    3: 30.00,
  };

  const [price, setPrice] = useState(basePrices[id]);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');

  const handleColorChange = (color) => {
    setColor(color);
    // Ajoute la logique pour changer l'image en fonction de la couleur
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
        <title>Détail du Produit {id}</title>
      </Head>

      <Button onClick={() => router.push('/')}>Retour à la section des produits</Button>

      <Box mt={5}>
        <Text fontSize="2xl">Produit {id}</Text>
        <Image src={`/product${id}.jpg`} alt={`Produit ${id}`} width={300} height={300} />
        <Text mt={3}>Prix de base : €{basePrices[id]}</Text>
        <Text mt={3}>Choisir une couleur :</Text>
        <Box>
          <Button onClick={() => handleColorChange('red')}>Rouge</Button>
          <Button onClick={() => handleColorChange('blue')}>Bleu</Button>
          <Button onClick={() => handleColorChange('green')}>Vert</Button>
        </Box>
        <Text mt={3}>Choisir une broderie :</Text>
        <Box>
          <Button onClick={() => handleEmbroideryChange('double_broderie_grande_et_petite')}>Double broderie grande et petite (+€3.5)</Button>
          <Button onClick={() => handleEmbroideryChange('double_broderie_grande')}>Double broderie grande (+€5.0)</Button>
          <Button onClick={() => handleEmbroideryChange('double_broderie_petite')}>Double broderie petite (+€2.0)</Button>
        </Box>
        <Text mt={3}>Prix final : €{price.toFixed(2)}</Text>
        <Text mt={3}>Préciser la position souhaitée de(s) broderie(s) :</Text>
        <Input placeholder="Position des broderies" />
        <Button mt={4} onClick={handlePayment}>Payer maintenant</Button>
      </Box>
    </Box>
  );
}
