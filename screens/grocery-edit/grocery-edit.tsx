import { FormInput } from '@/components/form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { StackParamsList } from '@/routes'
import { RouteProp, useRoute } from '@react-navigation/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'

type GroceryFormType = {
  title: string
  price: string
}

export const GroceryEdit = () => {
  const route = useRoute<RouteProp<StackParamsList, 'GroceryEdit'>>()

  const { grocery } = route.params || {}

  const { control, handleSubmit, setValue } = useForm<GroceryFormType>({
    defaultValues: {
      title: '',
      price: '',
    },
  })

  useEffect(() => {
    if (grocery) {
      setValue('title', grocery.title)
      setValue('price', grocery.price)
    }
  }, [grocery, setValue])

  const onSubmit = async (data: GroceryFormType) => {
    console.log('onSubmit', data)
  }

  return (
    <View className="flex-1">
      <Header label="Grocery" />

      <ScrollView className="mt-8 flex px-5">
        <FormInput
          name="title"
          placeholder="Enter title here..."
          control={control}
          label="Title"
          required
        />
        <FormInput
          name="price"
          control={control}
          label="Price"
          placeholder="Enter price here..."
          required
        />
      </ScrollView>

      <View className="mb-10 px-5">
        <Button size="lg" onPress={handleSubmit(onSubmit)}>
          <Text className="text-white">{grocery ? 'Edit' : 'Create'}</Text>
        </Button>
      </View>
    </View>
  )
}
