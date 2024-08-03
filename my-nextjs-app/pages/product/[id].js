// pages/product/[id].js
import { useRouter } from 'next/router';
import { Box, Text, Stack, Radio, RadioGroup, Textarea, Button, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Head from 'next/head';

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "EUR",
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');
  const [price, setPrice] = useState(20); // Prix de base par défaut
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`)
        .then(response => {
          setProduct(response.data);
          setPrice(response.data.price); // Prix de base depuis les données du produit
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données du produit:', error);
          setError('Erreur lors de la récupération des données du produit. Veuillez réessayer.');
        });
    }
  }, [id]);

  useEffect(() => {
    const updatePrice = () => {
      let newPrice = product ? product.price : 20; // Réinitialiser au prix par défaut
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
        case 'doubleBroderieGrande':
          newPrice += 6.99;
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
        <title>{product.name} - One TMD</title>
      </Head>

      <Box textAlign="center" color="white" bg="teal.500" p={4}>
        <Text fontSize="4xl">Détail du produit - One TMD</Text>
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
              {['red', 'blue', 'green'].map((clr) => (
                <Box
                  key={clr}
                  bg={clr}
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  cursor="pointer"
                  border={color === clr ? '2px solid black' : 'none'}
                  onClick={() => setColor(clr)}
                />
              ))}
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

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: price.toFixed(2), // Montant du produit
                      },
                      description: `Achat de ${product.name} chez One TMD`,
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                try {
                  const details = await actions.order.capture();
                  alert('Transaction completed by ' + details.payer.name.given_name);
                } catch (error) {
                  console.error('Erreur lors de la capture de la transaction:', error);
                  alert('Erreur lors de la capture de la transaction. Veuillez réessayer.');
                }
              }}
            />
          </PayPalScriptProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
