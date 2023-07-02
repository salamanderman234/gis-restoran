import AdminLayout from "@/components/Layouts/admin";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import EditMenuForm from "@/components/Form/EditMenuForm";

export default function AddMenuPage({ id, menuId }) {
	const [restaurant, setRestaurant] = useState(false);
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		const getServiceList = async () => {
			const dataRestaurant = await pb.collection("restaurants").getOne(id, {
				$autoCancel: false,
			});
			const dataMenu = await pb.collection("menus").getOne(menuId, {
				$autoCancel: false,
			});
			setRestaurant(dataRestaurant);
			setMenu(dataMenu);
		};
		getServiceList();
	}, []);
	return (
		<AdminLayout>
			<div className="px-20">
				<div className="w-full">
					<div className="col-span-2">
						<h1 className="font-bold text-2xl">Edit Menu</h1>
						<div className="mt-5">{restaurant && menu && <EditMenuForm restaurant={restaurant} menuData={menu} />}</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const id = context.query.id;
	const menuId = context.query.menuId;

	return {
		props: {
			id,
			menuId,
		},
	};
}
