import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { GroceryCard } from '@/layout/grocery'
import { StackParamsList } from '@/routes'
import { showToast } from '@/utils/toast'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { GroceryCardType } from './type'

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [groceryList, setGroceryList] = useState<GroceryCardType[]>(data)
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setGroceryList(data)
        setLoading(false)
      }, 1500)
    }

    fetchData()
  }, [])

  const handleDelete = (id: string) => {
    setGroceryList(prevList => prevList.filter(item => item.id !== id))
    setCompletedItems(prevCompletedItems => {
      const newCompletedItems = new Set(prevCompletedItems)
      newCompletedItems.delete(id)
      return newCompletedItems
    })

    showToast({
      type: 'success',
      text1: 'The item was removed from your grocery list.',
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

  const navigateToGroceryEdit = (item: GroceryCardType) => {
    navigation.navigate('GroceryEdit', { grocery: item })
  }

  function renderItem({ item }: { item: GroceryCardType }) {
    return (
      <GroceryCard
        item={item}
        onDelete={handleDelete}
        isChecked={completedItems.has(item.id)}
        onCheckChange={handleCheckChange}
        onNavigate={navigateToGroceryEdit}
        key={item.id}
      />
    )
  }

  if (loading) {
    return (
      <View className="w-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.green['400']} />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-4 flex-1 px-4">
        <FlatList data={groceryList} renderItem={renderItem} />
      </View>

      <View className="mb-8 px-4">
        <Button size="lg" onPress={() => navigation.navigate('GroceryEdit', {})} disabled={loading}>
          <Text className="text-white">New item</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

const data = [
  {
    title: 'first',
    price: '213',
    id: '1',
  },
  {
    title: 'second',
    price: '213',
    id: '2',
  },
  {
    title: 'third',
    price: '213',
    id: '3',
  },
]
