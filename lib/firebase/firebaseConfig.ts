import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let a: any
if (!getApps().length) {
	// console.log('＠＠＠＠＠＠＠Initializing Firebase Admin SDK')

	// const serviceAccount = JSON.parse(readFileSync(resolve(process.cwd(), 'serviceAccountKey.json'), 'utf8'))
	// console.log('serviceAccount', serviceAccount)
	if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
		throw new Error('FIREBASE_SERVICE_ACCOUNT環境変数が設定されていません。')
	}
	const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

	a = initializeApp({
		projectId: process.env.FIREBASE_PROJECT_ID,
		credential: cert(serviceAccount),
	})
}
export const firestore = getFirestore(a)
