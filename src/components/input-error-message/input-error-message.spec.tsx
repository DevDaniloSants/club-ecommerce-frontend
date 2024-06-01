import { render } from '@testing-library/react'
import InputErrorMessage from './input-error-message'
import Colors from '../../theme/theme.colors'

describe('input error message', () => {
  it('should show message with error color', () => {
    const { getByText } = render(
      <InputErrorMessage>Lorem Ipsum</InputErrorMessage>
    )

    const inputError = getByText('Lorem Ipsum')
    expect(inputError).toHaveStyle({ color: Colors.error })
  })
})
