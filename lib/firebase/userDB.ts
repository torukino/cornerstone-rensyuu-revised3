'use server'

import type { USER } from '@/types/user'

import { firestore } from '@/lib/firebase/firebaseConfig'

export const getUsers = async (): Promise<USER[]> => {
	const users: USER[] = []
	await firestore
		.collection('users')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				users.push(doc.data() as USER)
			})
		})
	return users
}
