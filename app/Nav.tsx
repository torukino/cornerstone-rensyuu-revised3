import React from 'react'

import { ArrowRightIcon, PowerIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import Link from 'next/link'

import { signOut } from '@/auth_old'

const Nav = () => {
	return (
		<div className="h-full flex flex-row  justify-between md:flex-col md:items-around md:w-64">
			<Link href="/" className="h-10 primaryButton flex items-start">
				root <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/dashboard" className="h-10 primaryButton flex items-start">
				dashboard <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/settings" className="h-10 primaryButton flex items-start">
				設定 <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/test" className="h-10 primaryButton flex items-start">
				テスト <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/auth" className="h-10 primaryButton flex items-start">
				auth <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/auth/login" className="h-10 primaryButton flex items-start">
				auth login
				<ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Link href="/auth/register" className="h-10 primaryButton flex items-start">
				auth register
				<ArrowRightIcon className="ml-2 w-6" />
			</Link>
			<Link href="/users" className="h-10 primaryButton flex items-start">
				ユーザ <ArrowRightIcon className="ml-2 w-6" />
			</Link>

			<Image
				src="/nozomi/sensei.png"
				width={200}
				height={200}
				className="w-36 mt-8 hidden md:block"
				alt="Screenshots of the dashboard project showing desktop version"
				priority
			/>

			<form
				action={async () => {
					'use server'
					await signOut()
				}}
			>
				<button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
					<PowerIcon className="w-6" />
					<div className="hidden md:block">Sign Out</div>
				</button>
			</form>
		</div>
	)
}

export default Nav
