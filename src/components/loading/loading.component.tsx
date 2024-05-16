import { FunctionComponent } from 'react'

import { Loader, LoadingContainer } from './loading.styles'

interface ILoadingProps {
  message?: string
}

const Loading: FunctionComponent<ILoadingProps> = ({ message }) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
      <Loader />
    </LoadingContainer>
  )
}

export default Loading
