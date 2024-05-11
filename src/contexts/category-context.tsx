import { FunctionComponent, ReactNode, createContext, useState } from 'react'

import Category from '../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firestore.converters'

interface ICategoryContext {
  categories: Category[]
  fetchCategories: () => Promise<void>
  isLoading: boolean
}

interface ICategoryProvider {
  children: ReactNode
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false,
})

const CategoryContextProvider: FunctionComponent<ICategoryProvider> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const categoriesFromFirestore: Category[] = []

      const querySnapShot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapShot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
