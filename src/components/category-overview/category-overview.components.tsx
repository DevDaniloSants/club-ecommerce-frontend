import { FunctionComponent } from 'react'
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer,
} from './category-overview.styles'

import Category from '../../types/category.types'

interface ICategoryOverviewProps {
  category: Category
}

const CategoryOverview: FunctionComponent<ICategoryOverviewProps> = ({
  category,
}) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer></ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
