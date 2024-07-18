import Head from 'next/head'
import { ChakraProvider, Box, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <Box>
        <Head>
          <title>OneTMD - E-commerce</title>
        </Head>
        <Box p={5}>
          <Text fontSize="xl">Welcome to OneTMD E-commerce!</Text>
          {/* Ajoutez le contenu de votre site ici */}
        </Box>
      </Box>
    </ChakraProvider>
  )
}
