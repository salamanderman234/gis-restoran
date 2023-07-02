import { Admin } from "pocketbase";
import { pb } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/Layouts/admin";
import StaticMarker from "@/components/Map/Marker";
import ObjectInfoModal from "@/components/Modal/ObjectInfoModal";
import ClickableMap from "@/components/Map/ClickableMap";

export default function MapPreview() {
	const [position, setPosition] = useState([-8.409518, 115.188919]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState({});
	const router = useRouter();

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
		const retrieve = async () => {
			const restaurantsList = await pb.collection("restaurants").getFullList({
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

		return <StaticMarker selected={selectedRestaurant} key={restaurant.id} position={position} details={restaurant} setData={markerSetSelectedRestaurant} />;
	});

	const mapClickHandler = (position) => {
		router.push({
			pathname: "/admin/restaurants/add/form",
			query: {
				lat: position.lat,
				lng: position.lng,
			},
		});
	};

	return (
		<AdminLayout title={"Pilih lokasi"}>
			<div style={{ height: 480 }}>
				<div className="flex w-full h-full">
					<ObjectInfoModal details={selectedRestaurant} />
					<div className="w-full">
						<ClickableMap position={position} clickHandler={mapClickHandler}>
							{markerList}
						</ClickableMap>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
