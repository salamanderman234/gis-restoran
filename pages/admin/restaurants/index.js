import Link from "next/link";
import { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase";
import { Admin } from "pocketbase";
import AdminLayout from "@/components/Layouts/admin";
import { useRouter } from "next/router";

export default function List({}) {
	const router = useRouter();
	const [restaurants, setRestaurants] = useState([]);
	const [seachKeyword, setSearchKeyword] = useState("");

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
		const retrieve = async () => {
			const restaurantsList = await pb.collection("restaurants").getFullList({
				sort: "-created",

				$autoCancel: false,
				expand: "restaurant_services(restaurant).service, restaurant_schedules(restaurant), restaurant_photos(restaurant), menus(restaurant).menu_photos(menu)",
			});
			setRestaurants(restaurantsList);
		};
		let unsub = () => {};
		const subscribe = async () => {
			unsub = await pb.collection("restaurants").subscribe("*", async ({ action, record }) => {
				if (action === "create") {
					setRestaurants((restaurants) => [...restaurants, record]);
				}
				if (action === "update") {
					setRestaurants((restaurants) => restaurants.map((element) => (element.id === record.id ? record : element)));
				}
				if (action === "delete") {
					setRestaurants((restaurants) => restaurants.filter((value) => value.id !== record.id));
				}
			});
		};
		retrieve();
		subscribe();
		return () => {
			unsub();
		};
	}, []);

	const deleteHandler = async (id) => {
		const agree = confirm(`anda yakin ingin menghapus restoran dengan id ${id} ?`);
		if (agree) {
			await pb.collection("restaurants").delete(id);
		}
	};

	const restaurantsRow = restaurants
		.filter(function (restaurant) {
			return restaurant.name.toLowerCase().includes(seachKeyword);
		})
		.map((restaurant, index) => (
			<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={restaurant.id}>
				<th scope="row" className="px-6 py-4">
					{index + 1}
				</th>
				<td className="px-6 py-4">{restaurant.name}</td>
				<td className="px-6 py-4">{restaurant.theme}</td>
				<td className="px-6 py-4">{restaurant.address}</td>
				<td className="px-6 py-4">{restaurant.email}</td>
				<td className="px-6 py-4 flex items-center justify-center w-full h-full">
					<Link href={`/admin/restaurants/edit/${restaurant.id}`} className="mx-1 bg-green-600 px-3 py-1 text-white font-bold">
						Edit
					</Link>
					<Link href={`/admin/restaurants/detail/${restaurant.id}`} className="mx-1 bg-blue-950 px-3 py-1 text-white font-bold">
						Detail
					</Link>
					<button className="mx-1 bg-red-600 px-3 py-1 text-white font-bold" onClick={() => deleteHandler(restaurant.id)}>
						Delete
					</button>
				</td>
			</tr>
		));

	return (
		<AdminLayout title={"List Restoran"}>
			<div className="grid grid-cols-2 gap-2 mb-1">
				<div className="flex items-center">
					<label className="sr-only">Search</label>
					<div className="relative w-full">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
							</svg>
						</div>
						<input
							type="text"
							id="simple-search"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search"
							onChange={(event) => setSearchKeyword(event.target.value.toLowerCase())}
						/>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						className="text-gray-900 mr-1 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={"/admin/restaurants/add"}
					>
						Tambah
					</Link>
					<Link
						className="text-gray-900 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={"/admin/map"}
					>
						Preview Map
					</Link>
				</div>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								No
							</th>
							<th scope="col" className="px-6 py-3">
								Nama
							</th>
							<th scope="col" className="px-6 py-3">
								Tema
							</th>
							<th scope="col" className="px-6 py-3">
								Detail Alamat
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							<th scope="col" className="px-6 py-3">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{restaurantsRow.length > 0 ? (
							restaurantsRow
						) : (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td colSpan={6} className="px-6 py-4 text-center">
									Tidak ada data yang bisa ditampilkan
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	);
}
