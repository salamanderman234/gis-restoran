import AdminLayout from "@/components/Layouts/admin";
import Map from "@/components/Map";
import DefaultMarker from "@/components/Map/Marker/Default";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pb } from "@/lib/pocketbase";
import EditForm from "@/components/Form/EditForm";

export default function EditServicePage({ service_id }) {
	const [service, setService] = useState({});
	const router = useRouter();
	useEffect(() => {
		const getService = async () => {
			try {
				const data = await pb.collection("restaurant_services").getOne(service_id, {
					$autoCancel: false,
					expand: "service(restaurant_service)",
				});
				setService(data);
			} catch (th) {
				router.push("/admin/restaurants");
			}
		};
		getRestaurant();
	}, []);
	return (
		<AdminLayout>
			<div className="px-20">
				<div className="w-full h-full grid grid-cols-3 gap-10">
					<div className="col-span-2">
						<h1 className="font-bold text-2xl">Edit Service</h1>
						<div className="mt-5">
							{/* <AddForm position={position} /> */}
							{restaurant.id != undefined ? <EditForm data={restaurant} position={position} /> : ""}
						</div>
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
