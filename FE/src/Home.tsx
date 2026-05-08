import { Button, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAddCustomer, useGetCustomers, useRemoveCustomer } from './apis'
import AmountSelect from './AmountSelect'
import CustomerGrid from './CustomerGrid'
import type { AddCustomerInput } from './schemas'

function Home() {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const getCustomers = useGetCustomers()
  const addCustomerMutation = useAddCustomer()
  const removeCustomerMutation = useRemoveCustomer()
  const form = useForm<AddCustomerInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      numChocolate: 0,
      numVanilla: 0,
      numStrawberry: 0,
    },
  })

  async function handleAddCustomer(values: AddCustomerInput) {
    const customers = await addCustomerMutation.mutateAsync(values)
    console.log('addCustomer response:', customers)
    form.reset({
      firstName: '',
      lastName: '',
      numChocolate: 0,
      numVanilla: 0,
      numStrawberry: 0,
    })
  }

  async function handleDeleteCustomers() {
    const customers = await removeCustomerMutation.mutateAsync(selectedIds)
    console.log('removeCustomers response:', customers)
    setSelectedIds([])
  }

  return (
    <VStack as="main" gap={4} align="start" p={6} width="100%">
      <Heading size="lg">Cupcake Orders</Heading>
      <Text>Customers loaded: {getCustomers.data?.length ?? 0}</Text>
      <CustomerGrid
        customers={getCustomers.data ?? []}
        onSelectedIdsChange={setSelectedIds}
      />
      <Button
        colorScheme="red"
        onClick={handleDeleteCustomers}
        disabled={selectedIds.length === 0 || removeCustomerMutation.isPending}
      >
        Delete Selected
      </Button>
      <VStack
        as="form"
        align="start"
        gap={3}
        width="100%"
        maxWidth="360px"
        onSubmit={form.handleSubmit(handleAddCustomer)}
      >
        <VStack align="start" gap={1} width="100%">
          <Text>First Name</Text>
          <Input {...form.register('firstName')} />
        </VStack>
        <VStack align="start" gap={1} width="100%">
          <Text>Last Name</Text>
          <Input {...form.register('lastName')} />
        </VStack>
        <AmountSelect label="Chocolate" name="numChocolate" register={form.register} />
        <AmountSelect label="Vanilla" name="numVanilla" register={form.register} />
        <AmountSelect label="Strawberry" name="numStrawberry" register={form.register} />
        <Button
          colorScheme="green"
          type="submit"
          disabled={!form.watch('firstName').trim() || !form.watch('lastName').trim()}
        >
          Add Customer
        </Button>
      </VStack>
    </VStack>
  )
}

export default Home
