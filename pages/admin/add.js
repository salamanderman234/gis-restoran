import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { pb } from "@/lib/pocketbase";
import { Admin } from "pocketbase";
import Map from "@/components/Map";
import SelectTab from "@/components/Tab/SelectTab";
import AddDetailTab from "@/components/Tab/TabPage/AddDetailTab";
import DefaultMarker from "@/components/Map/Marker/Default";
import AddSchedulesTab from "@/components/Tab/TabPage/AddSchedulesTab";

export default function AddMarker({ lat, lng }) {
	const menus = ["detail", "jadwal", "menu", "galeri"];
	const position = {
		lat,
		lng,
	};
	const router = useRouter();
	const [selectedMenu, setSelectedMenu] = useState("detail");
	const [dataDetail, setDataDetail] = useState({});

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
		if (!lat || !lng) {
			router.push({ pathname: "/admin" });
		}
		console.log(dataDetail);
	}, [dataDetail]);

	const selectMenuHandler = (menu) => {
		setSelectedMenu(menu);
	};

	return (
		<div className="h-screen w-screen justify-center bg-slate-100">
			<div className="bg-white h-full rounded-md shadow-lg text-black grid grid-cols-3 p-10 gap-10">
				<div className="col-span-1 h-3/4">
					<Map position={position}>
						<DefaultMarker position={position} />
					</Map>
				</div>
				<div className="col-span-2 h-3/4">
					<div className="h-1/6">
						<h1 className="text-center font-bold text-2xl">
							Tambah Restoran
						</h1>
						<div className="mt-5">
							<SelectTab
								menus={menus}
								defaultSelect={selectedMenu}
								selectHandler={selectMenuHandler}
							/>
						</div>
					</div>
					<div className="w-full h-4/6 overflow-auto">
						<div className="mt-5">
							{selectedMenu === "detail" ? (
								<AddDetailTab setDetailState={setDataDetail} />
							) : selectedMenu === "jadwal" ? (
								<AddSchedulesTab />
							) : (
								""
							)}
						</div>
					</div>
					<div className="h-1/6 w-full flex justify-center items-center">
						<button className="bg-green-400 px-5 py-2 rounded-md text-white font-bold mx-1">
							Submit
						</button>
						<Link
							href={"/admin"}
							className="bg-red-400 px-5 py-2 rounded-md text-white font-bold mx-1"
						>
							Kembali
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const lat = context.query.lat;
	const lng = context.query.lng;

	return {
		props: {
			lat,
			lng,
		},
	};
}
