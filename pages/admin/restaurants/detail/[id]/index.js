import { useState, useEffect } from "react";
import { pb } from "@/lib/pocketbase";
import { Admin } from "pocketbase";
import AdminLayout from "@/components/Layouts/admin";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RestaurantDetailPage({ id }) {
	const router = useRouter();
	const [restaurant, setRestaurant] = useState({});
	let services = [];
	let galleries = [];
	let menus = [];
	let schedules = [];

	const serviceDelete = async (id) => {
		const agree = confirm(`anda yakin ingin menghapus service ?`);
		if (agree) {
			await pb.collection("restaurant_services").delete(id).then(router.push("/admin/restaurants"));
		}
	};
	const galleryDelete = async (id) => {
		const agree = confirm(`anda yakin ingin menghapus galeri ?`);
		if (agree) {
			await pb.collection("restaurant_photos").delete(id).then(router.push("/admin/restaurants"));
		}
	};
	const scheduleDelete = async (id) => {
		const agree = confirm(`anda yakin ingin menghapus jadwal ?`);
		if (agree) {
			await pb.collection("restaurant_schedules").delete(id).then(router.push("/admin/restaurants"));
		}
	};
	const menuDelete = async (id) => {
		const agree = confirm(`anda yakin ingin menghapus menu ?`);
		if (agree) {
			await pb.collection("menus").delete(id).then(router.push("/admin/restaurants"));
		}
	};

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
		const retrieve = async () => {
			const data = await pb.collection("restaurants").getOne(id, {
				$autoCancel: false,
				expand: "restaurant_services(restaurant).service, restaurant_schedules(restaurant), restaurant_photos(restaurant), menus(restaurant).menu_photos(menu)",
			});
			setRestaurant(data);
		};
		retrieve();
	}, []);

	if ("expand" in restaurant) {
		if ("restaurant_services(restaurant)" in restaurant.expand) {
			services = restaurant.expand["restaurant_services(restaurant)"].map((service, index) => (
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={service.id}>
					<th scope="row" className="px-6 py-4">
						{index + 1}
					</th>
					<td className="px-6 py-4">{service.expand.service.name}</td>
					<td className="px-6 py-4">{service.expand.service.description}</td>
					<td className="px-6 py-4 flex items-center justify-center w-full h-full">
						<button className="mx-1 bg-red-600 px-3 py-1 text-white font-bold" onClick={() => serviceDelete(service.id)}>
							Delete
						</button>
					</td>
				</tr>
			));
		}
		if ("menus(restaurant)" in restaurant.expand) {
			menus = restaurant.expand["menus(restaurant)"].map((menu, index) => (
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={menu.id}>
					<th scope="row" className="px-6 py-4">
						{index + 1}
					</th>
					<td className="px-6 py-4">{menu.name}</td>
					<td className="px-6 py-4">{menu.price}</td>
					<td className="px-6 py-4">{menu.description}</td>
					<td className="px-6 py-4">{menu.image}</td>
					<td className="px-6 py-4 flex items-center justify-center w-full h-full">
						<Link href={`/admin/restaurants/detail/${restaurant.id}/menus/${menu.id}`} className="mx-1 bg-green-600 px-3 py-1 text-white font-bold">
							Edit
						</Link>
						<button className="mx-1 bg-red-600 px-3 py-1 text-white font-bold" onClick={() => menuDelete(menu.id)}>
							Delete
						</button>
					</td>
				</tr>
			));
		}
		if ("restaurant_schedules(restaurant)" in restaurant.expand) {
			schedules = restaurant.expand["restaurant_schedules(restaurant)"].map((schedule, index) => (
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={schedule.id}>
					<th scope="row" className="px-6 py-4">
						{index + 1}
					</th>
					<td className="px-6 py-4">{schedule.day_name}</td>
					<td className="px-6 py-4">{schedule.open}</td>
					<td className="px-6 py-4">{schedule.close}</td>
					<td className="px-6 py-4 flex items-center justify-center w-full h-full">
						<button className="mx-1 bg-red-600 px-3 py-1 text-white font-bold" onClick={() => scheduleDelete(schedule.id)}>
							Delete
						</button>
					</td>
				</tr>
			));
		}
		if ("restaurant_photos(restaurant)" in restaurant.expand) {
			galleries = restaurant.expand["restaurant_photos(restaurant)"].map((photo, index) => (
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={photo.id}>
					<th scope="row" className="px-6 py-4">
						{index + 1}
					</th>
					<td className="px-6 py-4">{photo.title}</td>
					<td className="px-6 py-4">{photo.image}</td>
					<td className="px-6 py-4 flex items-center justify-center w-full h-full">
						<button className="mx-1 bg-red-600 px-3 py-1 text-white font-bold" onClick={() => galleryDelete(photo.id)}>
							Delete
						</button>
					</td>
				</tr>
			));
		}
	}

	return (
		<AdminLayout title={"Detail restoran"}>
			<div>
				<div className="flex items-center justify-between mb-10">
					<h1 className="text-xl font-bold">Detail Restoran</h1>
					<Link className="bg-red-600 text-white text-center font-medium rounded-lg text-sm px-5 py-2.5" href={"/admin/restaurants"}>
						Kembali
					</Link>
				</div>
				<table className="mb-10">
					<tbody>
						<tr>
							<td className="pr-5">Nama Restoran :</td>
							<td className="pr-5">{restaurant.name}</td>
						</tr>
						<tr>
							<td className="pr-5">Alamat Restoran :</td>
							<td className="pr-5">{restaurant.address}</td>
						</tr>
						<tr>
							<td className="pr-5">Tema Restoran :</td>
							<td className="pr-5">{restaurant.theme}</td>
						</tr>
						<tr>
							<td className="pr-5">Jumlah Kursi :</td>
							<td className="pr-5">{restaurant.seat_amount}</td>
						</tr>
						<tr>
							<td className="pr-5">Email :</td>
							<td className="pr-5">{restaurant.email}</td>
						</tr>
						<tr>
							<td className="pr-5">No. Telp :</td>
							<td className="pr-5">{restaurant.phone}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="grid grid-cols-2 gap-2 mb-1">
				<div className="flex items-center">
					<div className="relative w-full">
						<h2 className="font-bold text-lg">Menu</h2>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						className="text-gray-900 mr-1 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={`/admin/restaurants/detail/${id}/menus/add`}
					>
						Tambah Menu
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
								Harga
							</th>
							<th scope="col" className="px-6 py-3">
								Deskripsi
							</th>
							<th scope="col" className="px-6 py-3">
								Image
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{menus.length > 0 ? (
							menus
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
			<div className="grid grid-cols-2 gap-2 mb-1 mt-5">
				<div className="flex items-center">
					<label className="sr-only">Search</label>
					<div className="relative w-full">
						<h2 className="font-bold text-lg">Services</h2>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						className="text-gray-900 mr-1 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={`/admin/restaurants/detail/${id}/services/add`}
					>
						Tambah Service
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
								Deskripsi
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{services.length > 0 ? (
							services
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
			<div className="grid grid-cols-2 gap-2 mb-1 mt-5">
				<div className="flex items-center">
					<label className="sr-only">Search</label>
					<div className="relative w-full">
						<h2 className="font-bold text-lg">Gallery</h2>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						className="text-gray-900 mr-1 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={`/admin/restaurants/detail/${id}/galleries/add`}
					>
						Tambah Gallery
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
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Url
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{galleries.length > 0 ? (
							galleries
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
			<div className="grid grid-cols-2 gap-2 mb-1 mt-5">
				<div className="flex items-center">
					<div className="relative w-full">
						<h2 className="font-bold text-lg">Schedules</h2>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Link
						className="text-gray-900 mr-1 text-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						href={`/admin/restaurants/detail/${id}/schedules/add`}
					>
						Tambah Schedule
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
								Hari
							</th>
							<th scope="col" className="px-6 py-3">
								Buka
							</th>
							<th scope="col" className="px-6 py-3">
								Tutup
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{schedules.length > 0 ? (
							schedules
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

export async function getServerSideProps(context) {
	const id = context.query.id;
	return {
		props: {
			id,
		},
	};
}
