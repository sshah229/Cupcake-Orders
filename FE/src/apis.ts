import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addCustomerSchema,
  customerSchema,
  customersSchema,
  type AddCustomerInput,
  type Customer,
} from './schemas'

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
  })
}

export function useAddCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: AddCustomerInput) => {
      const validatedPayload = addCustomerSchema.parse(payload)
      const response = await api.post('/add-customer', validatedPayload)
      return customerSchema.array().parse(response.data)
    },
    onSuccess: (validatedCustomers) => {
      queryClient.setQueryData(['customers'], validatedCustomers)
    },
  })
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
