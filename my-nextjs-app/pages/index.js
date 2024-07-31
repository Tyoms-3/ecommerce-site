import { useRouter } from 'next/router';
import { Box, Text, Stack, Radio, RadioGroup, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';

const initialOptions = {
  clientId: "EBZ-akuTSAgkGBVScJLZH6wQhKqCF4bx9eJFsDu9nYv1i50hdj-Q9z4eMUZPsXvu7EU4JtAVmnxLiLup",
  currency: "EUR",
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(20); // Set default price based on the product

  useEffect(() => {
    if (id) {
      // Fetch product data
      axios.get(`/api/products/${id}`)
        .then(response => {
          setProduct(response.data);
          // Optionally set the default price here
        })
        .catch(error => console.error('Error fetching product data:', error));
    }
  }, [id]);

  useEffect(() => {
    const updatePrice = () => {
      let newPrice = product ? product.price : 20; // Reset to default price based on the product
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

  if (!product) return <div>Loading...</div>;

  return (
    <Box>
      <Head>
        <title>{product.name} - One TMD</title> {/* Titre incluant le nom de la boutique */}
      </Head>

      <Box textAlign="center" color="white" bg="teal.500" p={4}>
        <Text fontSize="4xl">Détail du produit - One TMD</Text> {/* Nom de la boutique dans l'en-tête */}
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
            <Textarea placeholder="Préciser la position souhaitée de(s) broderie(s)" />
          </Box>

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: price.toFixed(2), // Montant du produit
                      },
                      description: `Achat de ${product.name} chez One TMD`, // Description incluant le nom de la boutique
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                alert('Transaction completed by ' + details.payer.name.given_name);
              }}
            />
          </PayPalScriptProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
