import { useRouter } from 'next/router';
import { Box, Text, Stack, Radio, RadioGroup, Textarea, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

const ProductPage = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(product.price || 20); // Prix par défaut

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

  if (!product) return <Text>Loading...</Text>;

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
          <img src={product.imageUrl || '/default-image.jpg'} alt={product.name || 'Produit'} style={{ maxWidth: '100%', borderRadius: '8px' }} />
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

export async function getStaticProps({ params }) {
  const { id } = params;

  // Lecture des données depuis le fichier JSON
  const filePath = path.join(process.cwd(), 'data/products.json');
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);
  
  // Trouver le produit correspondant à l'ID
  const product = products.find(product => product.id === id) || null;

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data/products.json');
  const jsonData = fs.readFileSync(filePath);
  const products = JSON.parse(jsonData);
  
  const paths = products.map(product => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default ProductPage;
