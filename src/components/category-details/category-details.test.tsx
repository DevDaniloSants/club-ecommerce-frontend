import * as firestore from 'firebase/firestore'

import Category from '../../types/category.types'
import { renderWithRedux } from '../../helpers/test-helpers'
import CategoryDetails from './category-details.components'

jest.mock('firebase/firestore')

describe('Category Details', () => {
  it('should fetch and show categories and its products', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockImplementation(async () => ({
      docs: [
        {
          data(): Category {
            return {
              id: '1',
              displayName: 'Lorem Ipsum',
              imageUrl: 'image_url',
              name: 'lorem-ipsum',
              products: [
                { id: '1', name: 'Boné', price: 100, imageUrl: 'image_url' },
              ],
            }
          },
        },
      ],
    }))

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }))

    mockedFirestore.query.mockImplementation(() => {})
    mockedFirestore.where.mockImplementation(() => {})

    const { findByText, getByText } = renderWithRedux(
      <CategoryDetails categoryId="any_id" />,
      {}
    )

    await findByText('Explorar Lorem Ipsum')
    getByText(/boné/i)
    getByText('R$ 100')
  })
})
