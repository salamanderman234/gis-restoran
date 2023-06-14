import { useState } from "react";

export default function SelectTab({ menus, defaultSelect, selectHandler }) {
	const [selectedMenu, setSelectedMenu] = useState(defaultSelect);

	const clickHandler = (menu) => {
		setSelectedMenu(menu);
		selectHandler(menu);
	};
	const menuList = menus.map((menu, index) => (
		<li
			key={index}
			onClick={() => clickHandler(menu)}
			className={`inline-block w-1/4 border-b ${
				selectedMenu === menu ? "border-blue-500 text-blue-500" : ""
			} text-center font-semibold leading-relaxed cursor-pointer`}
		>
			{menu.charAt(0).toUpperCase() + menu.slice(1)}
		</li>
	));
	return <ul className="pb-1 text-slate-600">{menuList}</ul>;
}
