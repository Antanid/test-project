import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { useColorScheme } from '@/components/useColorScheme'
import { Routes } from '@/routes'
import { useFonts } from 'expo-font'

import './global.css'

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
      <Routes />
    </GluestackUIProvider>
  )
}

export default RootLayout
