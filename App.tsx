import { Toast } from '@/components/toast'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useColorScheme } from '@/components/useColorScheme'
import { Routes } from '@/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import './global.scss'

const queryClient = new QueryClient()

function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  })

  const colorScheme = useColorScheme()

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Routes />
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}

export default RootLayout
