import { render, waitFor } from '@testing-library/react'

import CustomInput from './custom-input'
import Colors from '../../theme/theme.colors'
import userEvent from '@testing-library/user-event'

describe('custom input', () => {
  it('should render with error if hasError is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="Lorem Ipsum" hasError={true} />
    )

    const input = getByPlaceholderText('Lorem Ipsum')

    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` })
  })

  it('should render without error if hasError is false', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="Lorem Ipsum" hasError={false} />
    )

    const input = getByPlaceholderText('Lorem Ipsum')

    expect(input).toHaveStyle({ border: 'none' })
  })

  it('should change value when user types', async () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <CustomInput placeholder="Lorem Ipsum" hasError={false} />
    )

    const input = getByPlaceholderText('Lorem Ipsum')

    userEvent.type(input, 'Dolor Sit')

    await waitFor(() => {
      getByDisplayValue('Dolor Sit')
    })
  })
})
