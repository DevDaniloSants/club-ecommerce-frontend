import { useEffect, useState } from 'react'

import { getDocs, collection } from 'firebase/firestore'

import { CategoriesContainer, CategoriesContent } from './categories.styles'

import Category from '../../types/category.types'

import CategoryItem from '../category-item/category-item.component'
import { db } from '../../config/firebase.config'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapShot = await getDocs(collection(db, 'categories'))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      querySnapShot.forEach((doc: any) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
