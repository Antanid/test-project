// https://github.com/expo/expo/issues/23104#issuecomment-1689566248 @Bohdan
// import '@expo/metro-runtime'
import { registerRootComponent } from 'expo'
// https://reactnavigation.org/docs/stack-navigator#installation @Bogdan
import 'react-native-gesture-handler'

import RootLayout from './App'

registerRootComponent(RootLayout)
