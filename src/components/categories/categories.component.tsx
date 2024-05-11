import { useContext, useEffect } from 'react'

import { CategoriesContainer, CategoriesContent } from './categories.styles'

import CategoryItem from '../category-item/category-item.component'
import { CategoryContext } from '../../contexts/category-context'
import Loading from '../loading/loading.component'

const Categories = () => {
  const { categories, fetchCategories, isLoading } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <>
      {isLoading && <Loading />}
      <CategoriesContainer>
        <CategoriesContent>
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryItem category={category} />
            </div>
          ))}
        </CategoriesContent>
      </CategoriesContainer>
    </>
  )
}

export default Categories
