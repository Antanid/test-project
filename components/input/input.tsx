import { Input, InputField } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'

type CustomInputProps = {
  label?: string
}

export const CustomInput = ({ label }: CustomInputProps) => {
  return (
    <View className="gap-y-1">
      {label && <Text>{label}</Text>}
      <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
        <InputField placeholder="Enter Text here..." />
      </Input>
    </View>
  )
}
