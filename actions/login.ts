'use server'
import { AuthError } from 'next-auth'

import type * as z from 'zod'

import { signIn } from '@/auth'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail'
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
const BUG = false
export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFileds = LoginSchema.safeParse(values)
	BUG && console.log('validatedFileds in actions/login.tss', validatedFileds)
	if (!validatedFileds.success) {
		return { error: 'Invalid fields!' }
	}
	const { email, password, code } = validatedFileds.data
	BUG && console.log('email, password, code (in actions/login.ts)', { email, password, code })
	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email dose not exist!' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(existingUser.email)
		console.log('verificationToken in actions/login.ts', verificationToken)
		const sendVerificatonEmail = await sendVerificationEmail(verificationToken.email, verificationToken.token)

		return { success: 'Confirmation email sent!' }
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
			BUG && console.log('twoFactorToken (in actions/login.ts)', twoFactorToken)
			if (!twoFactorToken) return { error: 'Invalid code!' }

			if (!twoFactorToken) {
				return { error: 'Invalid code!' }
			}

			if (twoFactorToken.token !== code) {
				return { error: 'Invalid code!' }
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date()
			if (hasExpired) {
				return { error: 'Code has expired!' }
			}

			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id,
				},
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id,
					},
				})
			}
			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			})
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			BUG && console.log('twoFactorToken without code in else-block of actions/login.ts:', twoFactorToken)
			twoFactorToken && (await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token))

			return { twoFactor: true }
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
		return { success: 'email sent!' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' }
				default:
					return { error: 'Something went wrong!' }
			}
		}
		throw error
	}
}
