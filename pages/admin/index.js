import { Admin } from "pocketbase";
import { pb } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import StaticMarker from "@/components/Map/Marker";
import ObjectInfoModal from "@/components/Modal/ObjectInfoModal";
import ClickableMap from "@/components/Map/ClickableMap";

export default function AdminPage() {
	const router = useRouter();
	const [position, setPosition] = useState([-8.409518, 115.188919]);
	const [restaurants, setRestaurants] = useState([]);
	const [selectedRestaurant, setSelectedRestaurant] = useState({});

	const logout = async () => {
		pb.authStore.clear();
		router.push("/admin/login");
	};

	useEffect(() => {
		console.log(router);
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
	}, [router]);

	const mapClickHandler = (position) => {
		router.push({
			pathname: "/admin/add",
			query: {
				lat: position.lat,
				lng: position.lng,
			},
		});
	};

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
				<title>Admin - Sistem Informasi Geografis Restoran</title>
			</Head>
			<div className="flex flex-col bg-white h-screen w-screen">
				{/* <SideBar /> */}
				<div className="w-screen  bg-[url('https://static.vecteezy.com/system/resources/previews/006/986/565/large_2x/modern-simple-royal-blue-gradient-abstract-background-quotes-and-presentation-types-based-background-design-it-is-suitable-for-wallpaper-quotes-website-opening-presentation-personal-profile-etc-free-photo.jpg')] text-black h-1/6 flex justify-between items-center px-10">
					<span>asiap</span>
					<ul className="flex">
						<li className="mx-3">Petunjuk</li>
						<li className="mx-3">Logout</li>
					</ul>
				</div>
				<div className="flex w-full h-5/6">
					<ObjectInfoModal details={selectedRestaurant} />
					<div className="w-full">
						<ClickableMap position={position} clickHandler={mapClickHandler}>
							{markerList}
						</ClickableMap>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {},
	};
}
