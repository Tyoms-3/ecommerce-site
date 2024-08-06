// pages/product/[id].js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import { Box, Text, Button, Image, Input } from '@chakra-ui/react';
import clientPromise from '../../lib/mongodb';

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  const basePrice = product.basePrice;
  const [price, setPrice] = useState(basePrice);
  const [color, setColor] = useState('');
  const [embroidery, setEmbroidery] = useState('');

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleEmbroideryChange = (type, additionalCost) => {
    setEmbroidery(type);
    setPrice(basePrice + additionalCost);
  };

  const handlePayment = () => {
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_API_KEY&amount=${price}&currency_code=EUR&item_name=${product.name}`;
  };

  return (
    <Box bg="black" color="white" minHeight="100vh" p={5}>
      <Head>
        <title>{product.name}</title>
      </Head>

      <Button onClick={() => router.push('/product')}>Retour à la section des produits</Button>

      <Box mt={5} className="productDetailsContainer">
        <Text fontSize="2xl">{product.name}</Text>
        <Image src={product.image} alt={product.name} width={300} height={300} />
        <Text mt={3}>Prix de base : €{basePrice.toFixed(2)}</Text>
        <Text mt={3}>Choisir une couleur :</Text>
        <Box>
          {product.colors.map((colorOption, index) => (
            <Button key={index} onClick={() => handleColorChange(colorOption)}>{colorOption}</Button>
          ))}
        </Box>
        <Text mt={3}>Choisir une broderie :</Text>
        <Box>
          {product.embroideryOptions.map((option, index) => (
            <Button key={index} onClick={() => handleEmbroideryChange(option.type, option.additionalCost)}>{option.label}</Button>
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

export async function getServerSideProps({ params }) {
  const client = await clientPromise;
  const db = client.db('ecommerce');

  const product = await db.collection('products').findOne({ _id: new ObjectId(params.id) });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductDetails;
