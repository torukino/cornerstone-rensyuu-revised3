// import '@/app/globals.css'
import Nav from '@/app/Nav'
import NozomiLogo from '@/components/ui/nozomi-logo'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="m-2 flex h-screen flex-col  md:flex-row">
			<div className=" md:justify-center bg-gray-100">
				<div>
					<NozomiLogo />
				</div>
				<div className="mt-4">
					<Nav />
				</div>
			</div>
			<div className="bg-yellow-100 h-full flex flex-grow items-center justify-center p-6 md:w-3/5">{children}</div>
		</div>
	)
}
