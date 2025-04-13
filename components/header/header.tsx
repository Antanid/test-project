import { ArrowLeftIcon, Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { StackParamsList } from '@/routes'
import { showToast } from '@/utils/toast'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type HeaderProps = {
  label: string
  showBackWarning?: boolean
}

export const Header = ({ label, showBackWarning }: HeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const insets = useSafeAreaInsets()

  const handleGoHome = () => {
    if (showBackWarning) {
      showToast({
        type: 'warning',
        text1: 'Changes Not Saved',
      })
    }
    navigation.goBack()
  }

  return (
    <View style={{ marginTop: insets.top }}>
      <View className="flex flex-row items-center gap-x-5">
        <TouchableOpacity
          className="bg-button-nav-fill ml-4 mr-0 h-[28px] w-[28px] items-center justify-center rounded-full"
          onPress={handleGoHome}
        >
          <Icon as={ArrowLeftIcon} className="h-5 w-5 text-typography-500" />
        </TouchableOpacity>

        <View className="absolute left-1/2 -translate-x-1/2 transform">
          <Text className="text-lg text-neutral-800">{label}</Text>
        </View>
      </View>
    </View>
  )
}
