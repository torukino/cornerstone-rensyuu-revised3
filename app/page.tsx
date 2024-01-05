import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
	return (
		<main
			className="flex h-full flex-col items-center justify-center
		bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
		from-sky-400 to-blue-800"
		>
			<div className="space-y-6 text-center">
				<h1 className={cn('text-6xl font-semiboild text-white drop-shadow-md', font.className)}>🔐 Auth</h1>
				<p className="text-xl text-white">A simple authentication service</p>
				<div>
					<LoginButton>
						<Button variant="secondary" size="lg">
							Sign in{' '}
						</Button>
					</LoginButton>
				</div>
			</div>

			<Link href="/dashboard" className="mt-10 h-10 primaryButton flex items-start">
				<Button size="lg">
					dashboard <ArrowRightIcon className="ml-2 w-6" />
				</Button>
			</Link>
		</main>
	)
}
