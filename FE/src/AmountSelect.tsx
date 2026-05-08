import { NativeSelect, Text, VStack } from '@chakra-ui/react'
import type { AddCustomerInput } from './schemas'
import type { Path, UseFormRegister } from 'react-hook-form'

type AmountSelectProps = {
  label: string
  name: Path<AddCustomerInput>
  register: UseFormRegister<AddCustomerInput>
}

function AmountSelect({ label, name, register }: AmountSelectProps) {
  return (
    <VStack align="start" gap={1} width="100%">
      <Text>{label}</Text>
      <NativeSelect.Root width="100%">
        <NativeSelect.Field {...register(name, { valueAsNumber: true })}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </VStack>
  )
}

export default AmountSelect
