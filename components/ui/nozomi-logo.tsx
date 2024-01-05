import Image from 'next/image'

export default function NozomiLogo() {
	return (
		<div className="mt-2 flex flex-row items-center">
			<Image src="/nozomi/nozomi_cropped.png" width={50} height={50} alt="nozomi-memory-clinic-logo" priority />
			<p className="text-sm text-green-500">のぞみメモリークリニック</p>
		</div>
	)
}
