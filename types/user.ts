export interface USER {
	id: string
	name: string
	email: string
	password: string
	createdAt: string
}

export const initUser = {
	id: '',
	name: 'test',
	email: 'test',
	password: 'test',
	createdAt: '',
} as USER
