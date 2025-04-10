import ReactNativeToast from 'react-native-toast-message'

export const showToast = ({
  type,
  text1,
  text2,
  visibilityTime = 2000,
  props = {},
}: {
  type: string
  text1: string
  text2?: string
  visibilityTime?: number
  props?: object
}) => {
  // Hide any existing toast before showing a new one @Bogdan
  ReactNativeToast.hide()

  // Delay the toast display by 200ms for a smoother transition @Bogdan
  setTimeout(() => {
    ReactNativeToast.show({
      type,
      text1,
      text2,
      visibilityTime,
      props,
    })
  }, 200)
}
