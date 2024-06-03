import { renderWithRedux } from '../../helpers/test-helpers'
import Product from '../../types/product.types'
import ProductItem from './product-item.components'

describe('Product Item', () => {
  it('should show correct product', () => {
    const product: Product = {
      id: '1',
      imageUrl: 'image.png',
      name: 'boné',
      price: 100,
    }

    const { getByText } = renderWithRedux(<ProductItem product={product} />, {})

    getByText('boné')
    getByText('R$ 100')
    getByText(/adicionar ao carrinho/i)
  })
})
