import React, { ReactNode } from 'react'
import { ErrorMessageContainer } from './input-error-message.styles'

interface InputErrorMessageProps {
  children: ReactNode
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ children }) => {
  return <ErrorMessageContainer>{children}</ErrorMessageContainer>
}

export default InputErrorMessage
