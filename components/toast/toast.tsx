import { CustomToastProps, ToastConfigProps, ToastStyleProps } from '@/components/toast/type'
import { CloseIcon, Icon } from '@/components/ui/icon'
import { isIOS } from '@/core/device'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReactNativeToast, { BaseToast } from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

export const Toast = () => {
  // Get insets for safe area (top margin) @Bogdan
  const insets = useSafeAreaInsets()

  return <ReactNativeToast config={ToastConfig(insets.top)} visibilityTime={2000} />
}

// Function to create custom toast styles @Bogdan
function ToastConfig(insetTop: number): ToastConfigProps {
  const createToastStyle = ({ borderColor, background }: ToastStyleProps) => {
    return ({ props, ...rest }: CustomToastProps) => {
      const { hideTrailingIcon = false } = props || {}

      // Function to handle closing the toast @Bogdan
      const handleCloseToast = () => {
        ReactNativeToast.hide()
      }

      // Function to render the trailing icon with close button @Bogdan
      const renderTrailingIconWithMargin = hideTrailingIcon
        ? undefined
        : () => (
            <TouchableOpacity className="mt-1" onPress={handleCloseToast}>
              <Icon as={CloseIcon} className="m-2 h-4 w-4 text-black" />
            </TouchableOpacity>
          )

      return (
        <BaseToast
          {...rest}
          style={{
            borderLeftColor: borderColor,
            borderLeftWidth: 1,
            padding: 16,
            backgroundColor: background,
            height: 'auto',
            marginTop: insetTop - (isIOS ? 30 : 20),
            borderColor,
            borderWidth: 1,
          }}
          text1NumberOfLines={0}
          contentContainerStyle={{
            paddingHorizontal: 12,
            backgroundColor: background,
          }}
          text1Style={{
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
            color: colors.neutral[600],
          }}
          renderTrailingIcon={renderTrailingIconWithMargin} // Render trailing (close) icon @Bogdan
        />
      )
    }
  }

  return {
    success: createToastStyle({
      borderColor: colors.green[200],
      background: colors.green[50],
    }),
    alert: createToastStyle({
      borderColor: colors.blue[400],
      background: colors.blue[50],
    }),
    error: createToastStyle({
      borderColor: colors.red[300],
      background: colors.red[50],
    }),
    warning: createToastStyle({
      borderColor: colors.orange[200],
      background: colors.orange[50],
    }),
  }
}
