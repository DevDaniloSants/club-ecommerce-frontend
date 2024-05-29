import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import CategoryOverview from '../category-overview/category-overview.components'

import { Container } from './categories-overview.styles'
import { useAppSelector } from '../../hooks/redux.hooks'
import { fetchCategories } from '../../store/toolkit/category/categorySlice'

const CategoriesOverview: FunctionComponent = () => {
  const dispatch = useDispatch()

  const { categories } = useAppSelector((state) => state.categoryReducer)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [])

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
