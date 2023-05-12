import Image from "next/image";
import { useState } from "react";

export default function MenuCard({ data }) {
	const [currentImage, setCurrentImage] = useState(0);

	let images = [];
	if ("expand" in data) {
		if ("menu_photos(menu)" in data.expand) {
			images = data.expand["menu_photos(menu)"].map((image) => <Image className="rounded-t-md" src={image.url} width={1000} height={1000} alt={image.title} />);
		}
	}
	images.unshift(<Image className="rounded-t-md" src={data.banner} width={1000} height={1000} alt="banner" />);

	const nextImage = () => {
		const now = currentImage + 1;
		setCurrentImage(Math.min(now, images.length - 1));
	};
	const previousImage = () => {
		const now = currentImage - 1;
		setCurrentImage(Math.max(now, 0));
	};

	return (
		<div className="rounded-md hover:shadow-xl transition-all duration-300">
			<div className="w-full relative group">
				{images[currentImage]}
				{/* <Image className="rounded-t-md" src={data.banner} width={1000} height={1000} alt={data.name} /> */}
				{images.length > 1 ? (
					<>
						<div onClick={previousImage} className="cursor-pointer hover:opacity-100 group-hover:block hidden transition-all duration-300 absolute top-1/2 bg-white p-1 opacity-60">
							<Image src="/icons/left.png" width={20} height={20} alt="left" />
						</div>
						<div onClick={nextImage} className="cursor-pointer hover:opacity-100 group-hover:block hidden transition-all duration-300 absolute top-1/2 right-0 bg-white p-1 opacity-60">
							<Image src="/icons/right.png" width={20} height={20} alt="right" />
						</div>
					</>
				) : (
					""
				)}
			</div>
			<div className="p-1">
				<h2 className="font-bold mt-3 text-center">{data.name}</h2>
				<span className="block text-sm text-slate-600 text-center">Rp. {data.price}</span>
				<span className="block mt-1 text-center text-xs">
					{data.description.length > 70 ? (
						<>
							<span>{data.description.substring(0, 70)}</span>
							<span>...</span>
						</>
					) : (
						data.description
					)}
				</span>
			</div>
		</div>
	);
}
