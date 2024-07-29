import { useRouter } from 'next/router';
import { Box, Button, Text, Select, Textarea, Stack, Radio, RadioGroup } from '@chakra-ui/react';
import { useState } from 'react';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(20); // Set default price based on the product

  const updatePrice = (embroidery) => {
    let newPrice = 20; // Reset to default price based on the product
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

  const handleEmbroideryChange = (value) => {
    setEmbroidery(value);
    updatePrice(value);
  };

  return (
    <Box>
      <Box textAlign="center" color="white" bg="teal.500" p={4}>
        <Text fontSize="4xl">Détail du produit</Text>
      </Box>

      <Box p={4}>
        <Button onClick={() => router.back()}>Retour</Button>
      </Box>

      <Box p={4} display="flex">
        <Box flex="1" p={4}>
          <img src={`/image3-fond.jpg`} alt={`Product ${id}`} style={{ maxWidth: '100%' }} />
        </Box>

        <Box flex="1" p={4} bg="#B5A1A0">
          <Text fontSize="2xl" mb={4}>Prix: €{price.toFixed(2)}</Text>
          
          <Box mb={4}>
            <Text>Choix de la couleur:</Text>
            <Stack direction="row">
              <Box bg="red" w="20px" h="20px" onClick={() => setColor('red')} />
              <Box bg="blue" w="20px" h="20px" onClick={() => setColor('blue')} />
              <Box bg="green" w="20px" h="20px" onClick={() => setColor('green')} />
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
