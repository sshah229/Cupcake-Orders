import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import {
  addCustomerSchema,
  customerSchema,
  type AddCustomerInput,
} from './schemas'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

const removeCustomerIdsSchema = z.array(z.number().int().nonnegative())

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

export function useRemoveCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const validatedIds = removeCustomerIdsSchema.parse(ids)
      const response = await api.post('/remove-customers', { ids: validatedIds })
      return customerSchema.array().parse(response.data)
    },
    onSuccess: (validatedCustomers) => {
      queryClient.setQueryData(['customers'], validatedCustomers)
    },
  })
}
