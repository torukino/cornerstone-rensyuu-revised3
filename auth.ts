// eslint-disable-next-line import/order
import { PrismaAdapter } from '@auth/prisma-adapter'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'

import authConfig from '@/auth.config'
import { getUserById } from '@/data/user'
import { db } from '@/lib/db'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	update,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/lorro',
	},
	events: {
		async linkAccount({ user }) {
			console.log('linkAccount', user)
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			console.log('signIn', { user, account })
			if (account?.provider !== 'credentials') {
				return true
			}

			const existingUser = await getUserById(user.id)
			console.log('1:', { existingUser })
			// prevent sign in without email verifiaction
			if (!existingUser?.emailVerified) return false

			if (existingUser.isTwoFactorEnabled) {
				console.log('2:existingUser.isTwoFactorEnabled', { existingUser })
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

				console.log('3:twoFactorConfirmation', { twoFactorConfirmation })

				if (!twoFactorConfirmation) return false

				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				})
			}

			return true
		},

		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}
			if (session.user) {
				session.user.name = token.name
				session.user.email = token.email
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token
			// console.log({ existingUser })

			const existingAccount = await db.account.findFirst({ where: { userId: existingUser.id } })

			token.isOAuth = !!existingAccount
			token.name = existingUser.name
			token.email = existingUser.email
			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
