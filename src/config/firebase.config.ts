import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA-h-3kqwQ2pmOXZpbO23u6_0YhzQayZvM',
  authDomain: 'e-commerce-496b9.firebaseapp.com',
  databaseURL: 'https://e-commerce-496b9-default-rtdb.firebaseio.com',
  projectId: 'e-commerce-496b9',
  storageBucket: 'e-commerce-496b9.appspot.com',
  messagingSenderId: '935145050894',
  appId: '1:935145050894:web:04e406e5fcc95e6b4a7d5f',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
