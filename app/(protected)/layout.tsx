interface ProtectedLayoutProps {
	children: React.ReactNode
}

import React from 'react'

import Navbar from '@/app/(protected)/settings/_components/navbar'

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
	return (
		<div
			className=" flex h-full flex-col items-center justify-center
		bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
		from-sky-400 to-blue-800"
		>
			<Navbar />
			<div className="mt-10">{children}</div>
		</div>
	)
}

export default ProtectedLayout
