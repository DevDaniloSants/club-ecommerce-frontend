import React, { InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ hasError, ...rest }) => {
  return <CustomInputContainer hasError={hasError} {...rest} />
}

export default CustomInput
