import { Admin } from "pocketbase";
import { pb } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/Layouts/admin";
import StaticMarker from "@/components/Map/Marker";
import ObjectInfoModal from "@/components/Modal/ObjectInfoModal";
import Map from "@/components/Map";

export default function MapPreview() {
	const [position, setPosition] = useState([-8.409518, 115.188919]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState({});

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
		const retrieve = async () => {
			const restaurantsList = await pb
				.collection("restaurants")
				.getFullList({
					sort: "created",
					$autoCancel: false,
					expand: "restaurant_services(restaurant).service, restaurant_schedules(restaurant), restaurant_photos(restaurant), menus(restaurant).menu_photos(menu)",
				});
			setRestaurants(restaurantsList);
		};
		retrieve();
	}, []);

	const markerSetSelectedRestaurant = async (restaurant) => {
		setSelectedRestaurant(restaurant);
		setPosition([restaurant.lattitude, restaurant.langitude]);
	};

	const markerList = restaurants.map((restaurant) => {
		const position = [restaurant.lattitude, restaurant.langitude];

		return (
			<StaticMarker
				selected={selectedRestaurant}
				key={restaurant.id}
				position={position}
				details={restaurant}
				setData={markerSetSelectedRestaurant}
			/>
		);
	});

	return (
		<AdminLayout>
			<div style={{ height: 480 }}>
				<div className="flex w-full h-full">
					<ObjectInfoModal details={selectedRestaurant} />
					<div className="w-full">
						<Map position={position}>{markerList}</Map>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
