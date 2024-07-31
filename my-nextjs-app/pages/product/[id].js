// pages/product/[id].js
import { useRouter } from 'next/router';
import { Box, Text, Stack, Radio, RadioGroup, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(20); // Prix par défaut
  const [comment, setComment] = useState(''); // Ajout de l'état pour le commentaire

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(response => {
          setProduct(response.data);
          setPrice(response.data.price); // Définit le prix basé sur les données du produit
        })
        .catch(error => console.error('Error fetching product data:', error));
    }
  }, [id]);

  useEffect(() => {
    const updatePrice = () => {
      let newPrice = product ? product.price : 20;
      switch (embroidery) {
        case 'doubleBroderieGrandePetite':
          newPrice += 3.5;
          break;
        case 'doubleBroderieGrande':
          newPrice += 5;
          break;
        case 'doubleBroderiePetite':
          newPrice += 2;
          break;
        default:
          break;
      }
      setPrice(newPrice);
    };
    updatePrice();
  }, [embroidery, product]);

  const handleEmbroideryChange = (value) => {
    setEmbroidery(value);
  };

  const handleOrderSubmit = () => {
    axios.post('/api/orders', {
      productId: id,
      color,
      embroidery,
      price,
      comment, // Utilisation de l'état pour le commentaire
    })
    .then(response => {
      alert('Commande passée avec succès!');
    })
    .catch(error => {
      console.error('Error placing order:', error);
      alert('Échec de la commande.');
    });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Box>
      <Box textAlign="center" color="white" bg="teal.500" p={4}>
        <Text fontSize="4xl">Détail du produit</Text>
      </Box>

      <Box p={4}>
        <Button onClick={() => router.back()}>Retour</Button>
      </Box>

      <Box p={4} display="flex" flexWrap="wrap">
        <Box flex="1" p={4} minW="300px">
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </Box>

        <Box flex="1" p={4} bg="#B5A1A0" borderRadius="8px">
          <Text fontSize="2xl" mb={4}>Prix: €{price.toFixed(2)}</Text>

          <Box mb={4}>
            <Text>Choix de la couleur:</Text>
            <Stack direction="row" spacing={4}>
              <Box
                bg="red"
                w="20px"
                h="20px"
                borderRadius="full"
                cursor="pointer"
                border={color === 'red' ? '2px solid black' : 'none'}
                onClick={() => setColor('red')}
              />
              <Box
                bg="blue"
                w="20px"
                h="20px"
                borderRadius="full"
                cursor="pointer"
                border={color === 'blue' ? '2px solid black' : 'none'}
                onClick={() => setColor('blue')}
              />
              <Box
                bg="green"
                w="20px"
                h="20px"
                borderRadius="full"
                cursor="pointer"
                border={color === 'green' ? '2px solid black' : 'none'}
                onClick={() => setColor('green')}
              />
            </Stack>
          </Box>

          <Box mb={4}>
            <Text>Choix de la broderie:</Text>
            <RadioGroup onChange={handleEmbroideryChange} value={embroidery}>
              <Stack direction="column">
                <Radio value="grandeBroderie">Grande broderie</Radio>
                <Radio value="petiteBroderie">Petite broderie</Radio>
                <Radio value="doubleBroderieGrandePetite">Double broderie (Grande et petite)</Radio>
                <Radio value="doubleBroderieGrande">Double broderie (Grande)</Radio>
                <Radio value="doubleBroderiePetite">Double broderie (Petite)</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box mb={4}>
            <Text>Espace commentaire:</Text>
            <Textarea 
              placeholder="Préciser la position souhaitée de(s) broderie(s)" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>

          <Button colorScheme="teal" onClick={handleOrderSubmit}>Passer la commande</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
