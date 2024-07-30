import { useRouter } from 'next/router';
import { Box, Button, Text, Stack, Radio, RadioGroup, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(20);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(response => {
          setProduct(response.data);
          setPrice(response.data.price); // Met à jour le prix en fonction du produit
          setLoading(false);
        })
        .catch(error => {
          setError('Erreur lors du chargement du produit.');
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const updatePrice = () => {
      let newPrice = product ? product.price : 20; // Utilise le prix du produit ou le prix par défaut
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

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>{error}</Text>;

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
          <img src={product?.imageUrl || `/image3-fond.jpg`} alt={`Product ${id}`} style={{ maxWidth: '100%', borderRadius: '8px' }} />
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
            <Textarea placeholder="Préciser la position souhaitée de(s) broderie(s)" />
          </Box>

          <Button colorScheme="teal">Payer</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
