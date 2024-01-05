import React from 'react'

import ArrowRightIcon from '@heroicons/react/16/solid/ArrowRightIcon'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="flex h-full flex-col items-center justify-center
		bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
		from-sky-400 to-blue-800"
		>
			
			<Link href="/dashboard" className="h-10 primaryButton flex items-start">
				dashboard <ArrowRightIcon className="ml-2 w-6" />
			</Link>
			<main>{children}</main>
		</div>
	)
}

export default Layout
