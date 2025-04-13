import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { GroceryCard } from '@/layout/grocery'
import {
  Grocery,
  useDeleteGrocery,
  useGroceries,
  useUpdateGroceryCompleted,
} from '@/modules/grocery'
import { StackParamsList } from '@/routes'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FlashList } from '@shopify/flash-list'
import { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const opacity = useSharedValue(0)

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isRefetching,
  } = useGroceries()

  const updateCompletedMutation = useUpdateGroceryCompleted()
  const deleteGroceryMutation = useDeleteGrocery()

  const [groceryList, setGroceryList] = useState<Grocery[]>([])
  const [finalLoading, setFinalLoading] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)

  const handleDelete = (id: string) => {
    try {
      deleteGroceryMutation.mutate(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckChange = (id: string, checked: boolean) => {
    try {
      updateCompletedMutation.mutate({ id, completed: checked })
    } catch (error) {
      console.log(error)
    }
  }

  const navigateToGroceryEdit = (id: string) => {
    navigation.navigate('GroceryEdit', { id })
  }

  useEffect(() => {
    if (data) {
      setGroceryList(data?.pages)
    }
  }, [data, isFetching])

  useEffect(() => {
    if (isLoading) {
      setFinalLoading(true)
    }
    // Simulate a delay to show loading spinner
    setTimeout(() => {
      setFinalLoading(false)
    }, 500)
  }, [isLoading])

  useEffect(() => {
    if (!finalLoading) {
      opacity.value = withTiming(1, { duration: 500 })
    }
  }, [finalLoading])

  useEffect(() => {
    if (isRefetching) {
      // Simulate a delay to show loading spinner
      setRefreshLoading(true)
      setTimeout(() => {
        setRefreshLoading(false)
      }, 1000)
    }
  }, [isRefetching])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  function renderItem({ item }: { item: Grocery }) {
    return (
      <GroceryCard
        item={item}
        onDelete={handleDelete}
        isChecked={item?.completed}
        onCheckChange={handleCheckChange}
        onNavigate={navigateToGroceryEdit}
        key={item.id}
      />
    )
  }

  const handleEndReached = async () => {
    if (!isFetching && hasNextPage) {
      await fetchNextPage()
    }
  }

  if (finalLoading) {
    return (
      <View className="w-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.green['400']} />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <Animated.View style={animatedStyle} className="flex-1">
        <View className="mt-4 flex-1">
          <FlashList
            estimatedItemSize={96}
            data={groceryList}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={isFetchingNextPage}
            ListFooterComponent={
              isFetchingNextPage && hasNextPage ? (
                <View className="my-2">
                  <ActivityIndicator size="small" color={colors.green['400']} />
                </View>
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshLoading}
                onRefresh={refetch}
                tintColor={colors.green[200]}
                colors={[colors.green[200]]}
              />
            }
          />
        </View>

        <View className="mb-8 px-4">
          <Button
            size="lg"
            onPress={() => navigation.navigate('GroceryEdit', {})}
            disabled={finalLoading}
          >
            <Text className="text-white">New grocery</Text>
          </Button>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}
