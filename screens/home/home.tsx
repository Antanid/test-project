import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox'
import { CheckIcon, Icon, TrashIcon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { StackParamsList } from '@/routes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'

type GroceryCardType = {
  title: string
  price: number
  id: string
}

const GroceryCard = ({
  item,
  onDelete,
  isChecked,
  onCheckChange,
}: {
  onDelete: (id: string) => void
  isChecked: boolean
  onCheckChange: (id: string, checked: boolean) => void
  item: GroceryCardType
}) => {
  return (
    <Box className="border-w-1 m-2 flex-row items-center justify-between gap-x-2 rounded border border-outline-700 p-4">
      <View className="w-[70%] gap-y-2">
        <Text className={`font-semibold text-neutral-800 ${isChecked ? 'line-through' : ''}`}>
          {item.title}
        </Text>
        <Text className={`font-medium text-lime-700 ${isChecked ? 'line-through' : ''}`}>
          $ {item.price}
        </Text>
      </View>
      <View className="items-end justify-end">
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Icon as={TrashIcon} className="m-2 h-5 w-5 text-typography-500" />
        </TouchableOpacity>
        <Checkbox
          value={isChecked ? 'checked' : ''}
          size="md"
          isInvalid={false}
          isDisabled={false}
          onChange={checked => onCheckChange(item.id, checked)}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Check</CheckboxLabel>
        </Checkbox>
      </View>
    </Box>
  )
}

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const data = [
    {
      title: 'first',
      price: 213,
      id: '1',
    },
    {
      title: 'second',
      price: 213,
      id: '2',
    },
    {
      title: 'third',
      price: 213,
      id: '3',
    },
  ]
  const [groceryList, setGroceryList] = useState<GroceryCardType[]>(data)
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  console.log(completedItems, 'completedItems')

  const handleDelete = (id: string) => {
    setGroceryList(prevList => prevList.filter(item => item.id !== id))
    setCompletedItems(prevCompletedItems => {
      const newCompletedItems = new Set(prevCompletedItems)
      newCompletedItems.delete(id)
      return newCompletedItems
    })
  }

  const handleCheckChange = (id: string, checked: boolean) => {
    setCompletedItems(prevCompletedItems => {
      const newCompletedItems = new Set(prevCompletedItems)
      if (checked) {
        newCompletedItems.add(id)
      } else {
        newCompletedItems.delete(id)
      }
      return newCompletedItems
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-4" contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {groceryList.map(item => (
            <GroceryCard
              item={item}
              onDelete={handleDelete}
              isChecked={completedItems.has(item.id)}
              onCheckChange={handleCheckChange}
              key={item.id}
            />
          ))}
        </View>
      </ScrollView>
      <View className="mb-10 px-4">
        <Button onPress={() => navigation.navigate('GroceryEdit')}>
          <Text className="text-white">New item</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
