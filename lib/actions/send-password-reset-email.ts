import { getAuth,  sendPasswordResetEmail as firebaseSendPasswordResetEmail} from "firebase/auth"

export const sendPasswordResetEmail = async (email: string) => {
    const auth = getAuth()
    
    try {
        // firebase の sendPasswordResetEmail
        await firebaseSendPasswordResetEmail(auth, email)

        return {
            status: 'success',
            message: 'メールを送信しました。'
        }
    } catch (error) { 

        // エラー処理
        console.error(error)
        return {
            status: 'error',
            message: 'パスワードリセットメールの送信に失敗しました。'
        }
    }

    
}
