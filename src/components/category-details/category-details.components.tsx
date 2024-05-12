import { FunctionComponent, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BiChevronLeft } from 'react-icons/bi'

import { categoryConverter } from '../../converters/firestore.converters'
import Category from '../../types/category.types'
import { db } from '../../config/firebase.config'

import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer,
} from './category-details.styles'

import ProductItem from '../product-item/product-item.components'
import Loading from '../loading/loading.component'

interface ICategoryDetailsProps {
  categoryId: string
}

const CategoryDetails: FunctionComponent<ICategoryDetailsProps> = ({
  categoryId,
}) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true)
        const querySnapShot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId)
          )
        )

        const categoryFromFirestore = querySnapShot.docs[0]?.data()

        setCategory(categoryFromFirestore)
      } catch (error) {
        console.log({ error })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocument()
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      <CategoryTitle>
        <IconContainer>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  )
}

export default CategoryDetails
