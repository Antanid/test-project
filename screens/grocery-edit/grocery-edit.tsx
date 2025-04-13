import { FormInput } from '@/components/form'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useAddGrocery, useGroceryById, useUpdateGrocery } from '@/modules/grocery'
import { StackParamsList } from '@/routes'
import { RouteProp, useRoute } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import UUID from 'react-native-uuid'
import colors from 'tailwindcss/colors'

type GroceryFormType = {
  title: string
  price: string
}

export const GroceryEdit = () => {
  const opacity = useSharedValue(0)
  const [finalLoading, setFinalLoading] = useState(true)

  const route = useRoute<RouteProp<StackParamsList, 'GroceryEdit'>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
  const { id } = route.params || {}

  const { data } = useGroceryById(id)

  const { mutate: addGrocery } = useAddGrocery()
  const { mutate: updateGrocery } = useUpdateGrocery()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<GroceryFormType>({
    defaultValues: {
      title: '',
      price: '',
    },
  })

  // Effect to reset form when data is fetched
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        price: data.price,
      })

      // Simulate a delay to show loading spinner
      setTimeout(() => setFinalLoading(false), 500)
    }
  }, [data, reset])

  // Effect to handle the opacity animation based on loading and id
  useEffect(() => {
    if (!finalLoading || !id) {
      opacity.value = withTiming(1, { duration: 300 })
    }
  }, [finalLoading, id])

  // Handle the form submission
  const handleSaveGrocery = useCallback(
    (formData: GroceryFormType) => {
      const groceryData = {
        title: formData.title,
        price: formData.price,
      }

      if (data) {
        // Update grocery if data exists
        updateGrocery(
          { id: data.id, updatedData: groceryData },
          { onSuccess: () => navigation.goBack() },
        )
      } else {
        // Add new grocery if no data
        const newGrocery = { id: UUID.v4(), ...groceryData, completed: false }
        addGrocery(newGrocery, { onSuccess: () => navigation.goBack() })
      }
    },
    [data, updateGrocery, addGrocery, navigation],
  )

  // Animated style for fade-in effect
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  // Loading indicator while waiting for data
  if (finalLoading && id) {
    return (
      <View className="w-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.green['400']} />
      </View>
    )
  }

  return (
    <Animated.View style={animatedStyle} className="flex-1">
      <Header label="Grocery" showBackWarning={!!(isDirty && data)} />

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
          rules={{
            max: {
              value: 1_000_000,
              message: 'The value must not exceed 1,000,000',
            },
            pattern: {
              value: /^\d+$/,
              message: 'Only numbers are allowed',
            },
          }}
        />
      </ScrollView>

      <View className="mb-10 px-5">
        <Button size="lg" onPress={handleSubmit(handleSaveGrocery)}>
          <Text className="text-white">{id ? 'Edit' : 'Create'}</Text>
        </Button>
      </View>
    </Animated.View>
  )
}
