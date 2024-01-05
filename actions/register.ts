'use server'
import bcrypt from 'bcryptjs'

import type * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFileds = RegisterSchema.safeParse(values)

	if (!validatedFileds.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password, name } = validatedFileds.data
	const hashedPassword = await bcrypt.hash(password, 10)
	console.log(`hashedPassword`, { hashedPassword })

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Email already in use' }
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	//TODO: Send verification token email
	const verificationToken = await generateVerificationToken(email)

	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Confirmation email sent!' }
}
