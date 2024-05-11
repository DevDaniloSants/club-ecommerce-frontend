import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import Category from '../types/category.types'
import User from '../types/user.types'

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return { ...category }
  },
  fromFirestore(
    snapshop: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category {
    const data = snapshop.data(options)

    return {
      id: data.id,
      displayName: data.displayName,
      imageUrl: data.imageUrl,
      name: data.name,
      products: data.products,
    }
  },
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return { ...user }
  },
  fromFirestore(
    snapshop: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshop.data(options)

    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      provider: data.provider,
    }
  },
}
