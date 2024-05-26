import { collection, getDocs } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { categoryConverter } from '../../../converters/firestore.converters'
import { db } from '../../../config/firebase.config'

import Category from '../../../types/category.types'
import CategoryActionsTypes from './category.actions-types'

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CategoryActionsTypes.FETCH_CATEGORIES_START })
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapShot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapShot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      dispatch({
        type: CategoryActionsTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesFromFirestore,
      })
    } catch (error) {
      dispatch({ type: CategoryActionsTypes.FETCH_CATEGORIES_FAILURE })
    }
  }
}

export default fetchCategories
