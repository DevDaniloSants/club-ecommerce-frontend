import * as firestore from 'firebase/firestore'
import Category from '../../types/category.types'
import { renderWithRedux } from '../../helpers/test-helpers'
import Categories from './categories.component'
import { waitFor } from '@testing-library/dom'

jest.mock('firebase/firestore')

describe('Categories', () => {
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
            name: 'lorem ipsum',
            products: [
              { id: '1', imageUrl: 'image.png', name: 'lorem', price: 10 },
            ],
          }
        },
      },
    ])

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }))

    const { getByText } = renderWithRedux(<Categories />, {})

    await waitFor(() => getByText('lorem ipsum'))
    getByText('Explorar')
  })
})
