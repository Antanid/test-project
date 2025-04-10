import { ReactNode } from 'react'
import { ToastProps } from 'react-native-toast-message'

interface ToastCustomProps {
  hideLeadingIcon?: boolean // Option to hide the leading icon @Bogdan
  hideTrailingIcon?: boolean // Option to hide the trailing icon @Bogdan
}

export interface CustomToastProps extends ToastProps {
  props: ToastCustomProps
}

export interface ToastConfigProps {
  success: (props: CustomToastProps) => ReactNode
  alert: (props: CustomToastProps) => ReactNode
  error: (props: CustomToastProps) => ReactNode
  warning: (props: CustomToastProps) => ReactNode
  [key: string]: (props: CustomToastProps) => ReactNode
}

export type ToastStyleProps = {
  borderColor: string
  background: string
}
