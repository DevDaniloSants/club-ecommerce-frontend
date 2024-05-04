import React, { InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<
  HTMLInputElement,
  CustomInputProps
>((props, ref) => {
  return <CustomInputContainer {...props} ref={ref} />
})

CustomInput.displayName = 'CustomInput'

export default CustomInput
