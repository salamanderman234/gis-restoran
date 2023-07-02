import AdminLayout from "@/components/Layouts/admin";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import AddScheduleForm from "@/components/Form/AddScheduleForm";

export default function AddSchedulePage({ id }) {
	const [restaurant, setRestaurant] = useState({});

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
						<h1 className="font-bold text-2xl">Tambah Service</h1>
						<div className="mt-5">{restaurant && <AddScheduleForm restaurant={restaurant} />}</div>
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
