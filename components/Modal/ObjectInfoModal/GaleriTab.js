import Image from "next/image";

export default function GaleriTab({ details }) {
	let photos = [];
	if ("expand" in details) {
		if ("restaurant_photos(restaurant)" in details.expand) {
			photos = details.expand["restaurant_photos(restaurant)"].map((photo) => <Image className="hover:z-50 hover:scale-150 duration-300 transition-all" src={photo.url} alt="{photo.title}" width={1000} height={1000} />);
		}
	}
	return (
		<div className="mt-3 text-xs h-full">
			<div className="grid grid-cols-3 gap-1 h-full">{photos.length > 0 ? photos : <span className="col-span-3 block w-full text-center text-sm">Tidak ada foto yang bisa ditampilkan !</span>}</div>
		</div>
	);
}
