import { Button, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { removeCustomers, useAddCustomer, useGetCustomers } from './apis'
import CustomerGrid from './CustomerGrid'

function Home() {
  const queryClient = useQueryClient()
  const getCustomers = useGetCustomers()
  const addCustomerMutation = useAddCustomer()

  async function handleAddCustomer() {
    const customers = await addCustomerMutation.mutateAsync()
    console.log('addCustomer response:', customers)
  }

  async function handleDeleteCustomers() {
    const customers = await removeCustomers()
    console.log('removeCustomers response:', customers)
    await queryClient.invalidateQueries({ queryKey: ['customers'] })
  }

  return (
    <VStack as="main" gap={4} align="start" p={6} width="100%">
      <Heading size="lg">Cupcake Orders</Heading>
      <Text>Customers loaded: {getCustomers.data?.length ?? 0}</Text>
      <CustomerGrid customers={getCustomers.data ?? []} />
      <HStack>
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
