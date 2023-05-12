import Map from "@/components/Map";
import StaticMarker from "@/components/Map/Marker";
import ObjectInfoModal from "@/components/Modal/ObjectInfoModal";
import SideBar from "@/components/Navbar/SideBar";
import Head from "next/head";
import { pb } from "@/lib/pocketbase";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [position, setPosition] = useState([-8.409518, 115.188919]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState({});

	useEffect(() => {
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

	return (
		<>
			<Head>
				<title>Sistem Informasi Geografis Restoran</title>
			</Head>
			<div className="flex bg-white h-screen w-screen">
				{/* <SideBar /> */}
				<ObjectInfoModal details={selectedRestaurant} />
				<div className="w-full">
					<Map position={position}>{markerList}</Map>
				</div>
			</div>
		</>
	);
}
