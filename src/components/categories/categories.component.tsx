import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchCategories } from '../../store/reducers/category/category.actions'
import { useAppSelector } from '../../hooks/redux.hooks'

import { CategoriesContainer, CategoriesContent } from './categories.styles'

import CategoryItem from '../category-item/category-item.component'
import Loading from '../loading/loading.component'

const Categories = () => {
  const dispatch = useDispatch()

  const { isLoading, categories } = useAppSelector(
    (state) => state.categoryReducer
  )

  useEffect(() => {
    dispatch(fetchCategories())
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
