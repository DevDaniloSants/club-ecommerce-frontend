import { renderWithRedux } from '../../helpers/test-helpers'
import Category from '../../types/category.types'

import CategoryOverview from './category-overview.components'

describe('Category Overview', () => {
  it('should show correct category and its products', async () => {
    const category: Category = {
      id: '1',
      displayName: 'masculino',
      imageUrl: 'image.png',
      name: 'Masculino',
      products: [
        {
          id: '1',
          imageUrl: 'image.png',
          name: 'jaqueta',
          price: 50,
        },
        {
          id: '2',
          imageUrl: 'image.png',
          name: 'tênis',
          price: 100,
        },
        {
          id: '3',
          imageUrl: 'image.png',
          name: 'bermuda',
          price: 30,
        },
        {
          id: '4',
          imageUrl: 'image.png',
          name: 'camiseta',
          price: 70,
        },
        {
          id: '5',
          imageUrl: 'image.png',
          name: 'calça',
          price: 90,
        },
      ],
    }

    const { getByText, queryByText } = renderWithRedux(
      <CategoryOverview category={category} />,
      {}
    )

    getByText(/masculino/i)

    getByText(/jaqueta/i)
    getByText('R$ 50')

    getByText(/tênis/i)
    getByText('R$ 100')

    getByText(/bermuda/i)
    getByText('R$ 30')

    getByText(/camiseta/i)
    getByText('R$ 70')

    expect(queryByText('calça')).toBeNull()
  })
})
