import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDocs, collection } from 'firebase/firestore'

import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converters/firestore.converters'
import Category from '../../../types/category.types'

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const categoriesFromFirestore: Category[] = []
    const querySnapShot = await getDocs(
      collection(db, 'categories').withConverter(categoryConverter)
    )

    querySnapShot.forEach((doc) => {
      categoriesFromFirestore.push(doc.data())
    })

    return categoriesFromFirestore
  }
)

interface InitialState {
  isLoading: boolean
  categories: Category[]
}

const initialState: InitialState = {
  isLoading: false,
  categories: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    }),
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      }),
      builder.addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default categorySlice.reducer
