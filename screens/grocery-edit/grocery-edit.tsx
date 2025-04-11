import { FormInput } from '@/components/form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useAddGrocery, useUpdateGrocery } from '@/hooks/useGroceries'
import { StackParamsList } from '@/routes'
import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import UUID from 'react-native-uuid'

type GroceryFormType = {
  title: string
  price: string
}

export const GroceryEdit = () => {
  const route = useRoute<RouteProp<StackParamsList, 'GroceryEdit'>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const { grocery } = route.params || {}
  const { mutate: addGrocery } = useAddGrocery()
  const { mutate: updateGrocery } = useUpdateGrocery()

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

  const handleSaveGrocery = (data: GroceryFormType) => {
    const groceryData = {
      title: data.title,
      price: data.price,
    }

    if (grocery) {
      updateGrocery(
        { id: grocery.id, updatedData: groceryData },
        { onSuccess: () => navigation.navigate('HomeScreen') },
      )
    } else {
      const newGrocery = { id: UUID.v4(), ...groceryData, completed: false }
      addGrocery(newGrocery, { onSuccess: () => navigation.navigate('HomeScreen') })
    }
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
        <Button size="lg" onPress={handleSubmit(handleSaveGrocery)}>
          <Text className="text-white">{grocery ? 'Edit' : 'Create'}</Text>
        </Button>
      </View>
    </View>
  )
}
