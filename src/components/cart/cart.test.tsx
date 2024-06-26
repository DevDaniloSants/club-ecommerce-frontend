import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom'

import { renderWithRedux } from '../../helpers/test-helpers'
import CartProducts from '../../types/cartProducts.types'

import Cart from './cart.components'

describe('cart', () => {
  it('should show correct cart products', () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 1,
      },
    ]
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products } } as any,
    })

    getByText(/boné/i)
    getByText('R$100')
    getByText('1')
    getByText('Total: R$ 100')
    getByText('Ir para o Checkout')
    expect(queryByText(/seu carrinho está vazio/i)).toBeNull()
  })

  it('should not show checkout button and should show an empty message if cart is empty', () => {
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products: [] } } as any,
    })

    getByText(/seu carrinho está vazio/i)
    expect(queryByText('Ir para o Checkout')).toBeNull()
  })

  it('should increase product quantity on decrease click', async () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 2,
      },
    ]
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products } } as any,
    })
    const decreaseButton = getByLabelText('Decrease of boné')
    userEvent.click(decreaseButton)

    await waitFor(() => expect(getByText('1')))
    getByText('Total: R$ 100')
  })
  it('should increase product quantity on increase click', async () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 2,
      },
    ]
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      preloadedState: { cartReducer: { products } } as any,
    })
    const decreaseButton = getByLabelText('Increase of boné')
    userEvent.click(decreaseButton)

    await waitFor(() => expect(getByText('3')))
    getByText('Total: R$ 300')
  })

  it('should remove product on remove click', async () => {
    const products: CartProducts[] = [
      {
        id: '1',
        imageUrl: 'image.png',
        name: 'boné',
        price: 100,
        quantity: 2,
      },
    ]

    const { getByLabelText, queryByText, getByText } = renderWithRedux(
      <Cart />,
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preloadedState: { cartReducer: { products } } as any,
      }
    )

    const removeButton = getByLabelText('Remove of boné')
    userEvent.click(removeButton)

    await waitFor(() => expect(queryByText('boné')).toBeNull())
    getByText(/seu carrinho está vazio/i)
    expect(queryByText('Ir para o Checkout')).toBeNull()
  })
})
