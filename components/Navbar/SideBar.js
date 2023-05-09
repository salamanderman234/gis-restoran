import Image from "next/image";

export default function SideBar({ selected }) {
	return (
		<div className="h-screen w-1/12 flex">
			<ul className="text-black w-full border-r">
				<li className="flex items-center justify-center pl-3 pr-5 py-7 border-l-4 border-white">
					<Image
						src="/icons/search(1).png"
						alt="search"
						width="20"
						height="20"
					/>
				</li>
				<li className="flex items-center justify-center pl-3 pr-5 py-7 border-l-4 border-blue-500">
					<Image
						src="/icons/info(1).png"
						alt="search"
						width="20"
						height="20"
					/>
				</li>
			</ul>
		</div>
	);
}
