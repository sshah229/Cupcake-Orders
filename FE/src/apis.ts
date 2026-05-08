import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { customerSchema, customersSchema, type Customer } from './schemas'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

async function fetchCustomers(): Promise<Customer[]> {
  const response = await api.get('/get-customers')
  return customersSchema.parse(response.data)
}

export function useGetCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get('/get-customers')
      return customerSchema.array().parse(response.data)
    },
    enabled: false,
  })
}

export async function addCustomer(): Promise<Customer[]> {
  const payload = {
    firstName: 'Alice',
    lastName: 'Smith',
    numChocolate: 2,
    numVanilla: 1,
    numStrawberry: 3,
  } as const

  const response = await api.post('/add-customer', payload)
  return customersSchema.parse(response.data)
}

export async function removeCustomers(): Promise<Customer[]> {
  const customers = await fetchCustomers()
  const ids = customers
    .map((customer) => customer.id)
    .filter((id): id is number => id !== undefined)

  const payload = { ids }

  const response = await api.post('/remove-customers', payload)
  return customersSchema.parse(response.data)
}
