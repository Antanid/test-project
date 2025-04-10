import { Input, InputField } from '@/components/ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Text, View } from 'react-native'

type FormInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: object
  required?: boolean
  label?: string
  error?: string
  placeholder?: string
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules = {},
  required = false,
  label,
  placeholder,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'This field is required' : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mt-4 gap-y-2">
          {label && <Text>{label}</Text>}
          <Input variant="outline" size="md" isInvalid={!!error}>
            <InputField placeholder={placeholder} value={value} onChangeText={onChange} />
          </Input>
          {error && <Text className="text-sm text-red-600">{error?.message}</Text>}
        </View>
      )}
    />
  )
}
