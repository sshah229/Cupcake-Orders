import { Button, HStack, Heading, VStack } from '@chakra-ui/react'
import { addCustomer, removeCustomers, useGetCustomers } from './apis'

async function handleAddCustomer() {
  const customers = await addCustomer()
  console.log('addCustomer response:', customers)
}

async function handleDeleteCustomers() {
  const customers = await removeCustomers()
  console.log('removeCustomers response:', customers)
}

function Home() {
  const { refetch: refetchCustomers } = useGetCustomers()

  async function handleGetCustomers() {
    const result = await refetchCustomers()
    console.log('getCustomers response:', result.data)
  }

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
