import Image from "next/image";
import { useState } from "react";

export default function ObjectInfoModal({ details }) {
	const [selectedMenu, setSelectedMenu] = useState("detail");

	let services = [];
	if ("expand" in details) {
		console.log(details.expand);
		services = details.expand["restaurant_services(restaurant)"].map(
			(service) => (
				<li key={service.id} className="text-xs inline font-semibold">
					<span>&bull;</span>
					<span className="mx-1">{service.expand.service.name}</span>
				</li>
			)
		);
	}
	return (
		<div className="h-screen flex flex-col w-1/3 bg-white">
			{!(Object.keys(details).length === 0) ? (
				<>
					<div className="w-full">
						<Image
							className="w-full"
							src={details.banner}
							alt="banner"
							width={1000}
							height={1000}
						/>
					</div>
					<div className="px-3 text-black">
						<h1 className="mt-5 text-2xl">{details.name}</h1>
						<span className="text-slate-500">{details.theme}</span>
						<ul className="w-full list-disc">{services}</ul>
						<ul className="mt-7 pb-1 text-slate-600">
							<li
								onClick={() => setSelectedMenu("detail")}
								className={`inline-block w-1/3 border-b ${
									selectedMenu === "detail"
										? "border-blue-500 text-blue-500"
										: ""
								} text-center font-semibold leading-relaxed cursor-pointer`}
							>
								Detail
							</li>
							<li
								onClick={() => setSelectedMenu("menu")}
								className={`inline-block w-1/3 border-b ${
									selectedMenu === "menu"
										? "border-blue-500 text-blue-500"
										: ""
								} text-center font-semibold leading-relaxed cursor-pointer`}
							>
								Menu
							</li>
							<li
								onClick={() => setSelectedMenu("galeri")}
								className={`inline-block w-1/3 border-b ${
									selectedMenu === "galeri"
										? "border-blue-500 text-blue-500"
										: ""
								} text-center font-semibold leading-relaxed cursor-pointer`}
							>
								Galeri
							</li>
						</ul>
					</div>
				</>
			) : (
				<>
					<div className="w-full h-full flex justify-center items-center text-black">
						<span>Tidak ada marker yang dipilih !</span>
					</div>
				</>
			)}
		</div>
	);
}
