import * as firestore from 'firebase/firestore'
import { waitFor } from '@testing-library/dom'

import Category from '../../types/category.types'
import { renderWithRedux } from '../../helpers/test-helpers'

import CategoriesOverview from './categories-overview.component'

jest.mock('firebase/firestore')

describe('Categories Overview', () => {
  it('should fetch and show categories', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data(): Category {
          return {
            id: '1',
            displayName: 'lorem ipsum',
            imageUrl: 'image.png',
            name: 'lorem-ipsum',
            products: [
              { id: '1', imageUrl: 'image.png', name: 'boné', price: 100 },
            ],
          }
        },
      },
    ])

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }))

    const { getByText } = renderWithRedux(<CategoriesOverview />, {})

    await waitFor(() => getByText('boné'))
    getByText('lorem ipsum')
    getByText('R$ 100')
  })
})
