import NozomiLogo from '@/components/ui/nozomi-logo'
import LoginForm from '@/ui/login-form'

export default function LoginPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="mt-10 relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex w-full items-end rounded-lg bg-blue-500 p-3 h-20">
					<div className="w-64 text-white">
						<NozomiLogo />
					</div>
				</div>
				<LoginForm />
			</div>
		</main>
	)
}
