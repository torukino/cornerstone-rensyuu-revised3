import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			console.log('authorized in auth.config.ts')
			console.log('auth', JSON.stringify(auth))
			console.log('nextUrl', nextUrl)
			console.log('nextUrl.pathname', nextUrl.pathname)

			const isLoggedIn: boolean = !!auth?.user
			const isOnDashboard: boolean = nextUrl.pathname.startsWith('/dashboard')

			console.log('isLoggedIn', isLoggedIn)
			console.log('isOnDashboard', isOnDashboard)

			if (isOnDashboard) {
				if (isLoggedIn) return true
				else return false // Redirect unauthenticated users to login page
			} else {
				if (isLoggedIn) {
					return Response.redirect(new URL('/dashboard', nextUrl))
				} else return false // Redirect unauthenticated users to login page
			}
			return true
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
