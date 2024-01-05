'use client'
import React from 'react'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
	children: React.ReactNode
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout()
	}

	return (
		<div onClick={onClick} className="cursor-pointer">
			{children}
		</div>
	)
}

export default LogoutButton
