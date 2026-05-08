import { Button, HStack, Heading, VStack } from '@chakra-ui/react'
import { addCustomer, getCustomers, removeCustomers } from './apis'

async function handleGetCustomers() {
  const customers = await getCustomers()
  console.log('getCustomers response:', customers)
}

async function handleAddCustomer() {
  const customers = await addCustomer()
  console.log('addCustomer response:', customers)
}

async function handleDeleteCustomers() {
  const customers = await removeCustomers()
  console.log('removeCustomers response:', customers)
}

function Home() {
  return (
    <VStack as="main" gap={4} align="start" p={6}>
      <Heading size="lg">Cupcake Orders</Heading>
      <HStack>
        <Button colorScheme="blue" onClick={handleGetCustomers}>
          Get Customers
        </Button>
        <Button colorScheme="green" onClick={handleAddCustomer}>
          Add Customer
        </Button>
        <Button colorScheme="red" onClick={handleDeleteCustomers}>
          Delete Customers
        </Button>
      </HStack>
    </VStack>
  )
}

export default Home
