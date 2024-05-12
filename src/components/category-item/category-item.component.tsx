import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

import Category from '../../types/category.types'

import { CategoryItemContainer, CategoryName } from './category-item.styles'

interface CategoryItemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate()

  const handleCategoryClick = () => {
    navigate(`/category/${category.id}`)
  }

  return (
    <CategoryItemContainer backgroundimage={category.imageUrl}>
      <CategoryName onClick={handleCategoryClick}>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
