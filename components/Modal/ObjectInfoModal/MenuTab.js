import MenuCard from "@/components/Card/MenuCard";

export default function MenuTab({ details }) {
	let menus = [];
	if ("expand" in details) {
		if ("menus(restaurant)" in details.expand) {
			menus = details.expand["menus(restaurant)"].map((menu) => <MenuCard key={menu.id} data={menu} />);
		}
	}

	return (
		<>
			<div className="mt-3">
				<div className="grid grid-cols-2 gap-2">{menus.length > 0 ? menus : <span className="text-center col-span-2 text-sm w-full block">Tidak ada menu yang bisa ditampilkan !</span>}</div>
			</div>
		</>
	);
}
