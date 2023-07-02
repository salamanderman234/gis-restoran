import AdminLayout from "@/components/Layouts/admin";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import AddMenuForm from "@/components/Form/AddMenuForm";

export default function AddMenuPage({ id }) {
	const [restaurant, setRestaurant] = useState(false);

	useEffect(() => {
		const getServiceList = async () => {
			const dataRestaurant = await pb.collection("restaurants").getOne(id, {
				$autoCancel: false,
			});
			setRestaurant(dataRestaurant);
		};
		getServiceList();
	}, []);
	return (
		<AdminLayout>
			<div className="px-20">
				<div className="w-full">
					<div className="col-span-2">
						<h1 className="font-bold text-2xl">Tambah Menu Baru</h1>
						<div className="mt-5">{restaurant && <AddMenuForm restaurant={restaurant} />}</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const id = context.query.id;

	return {
		props: {
			id,
		},
	};
}
