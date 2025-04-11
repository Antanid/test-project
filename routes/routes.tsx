import { GroceryEdit } from '@/screens/grocery-edit'
import { HomeScreen } from '@/screens/home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<StackParamsList>()

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GroceryEdit" component={GroceryEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export type StackParamsList = {
  HomeScreen: undefined
  GroceryEdit: { id?: string }
}
