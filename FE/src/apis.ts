import axios from 'axios'
import { customersSchema, type Customer } from './schemas'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export async function getCustomers(): Promise<Customer[]> {
  const response = await api.get('/get-customers')
  return customersSchema.parse(response.data)
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
  const customers = await getCustomers()
  const ids = customers
    .map((customer) => customer.id)
    .filter((id): id is number => id !== undefined)

  const payload = { ids }

  const response = await api.post('/remove-customers', payload)
  return customersSchema.parse(response.data)
}
