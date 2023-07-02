import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AdminLayout({ title, children }) {
	const router = useRouter();
	const logout = async () => {
		pb.authStore.clear();
		router.push("/admin/login");
	};
	return (
		<>
			<Head>
				<title>GIS Restoran{title ? title : " - Admin"}</title>
			</Head>
			<div className="bg-white min-h-screen">
				<div className="w-full bg-sky-950 text-white py-5 px-20 flex justify-between items-center">
					<Link href={"/"}>
						<h1 className="font-semibold text-xl">
							<span className="font-extrabold leading-loose">SI</span> Geografis Restoran
						</h1>
					</Link>
					<ul className="flex text-lg">
						<li className="mx-2 font-semibold">
							<Link href={"/admin/restaurants"}>List</Link>
						</li>
						<li className="mx-2 font-semibold">
							<Link href={"/admin/map"}>Map</Link>
						</li>
						<li className="mx-2 font-semibold">
							<button onClick={() => logout()}>Logout</button>
						</li>
					</ul>
				</div>
				<div className="w-full p-10 text-black">{children}</div>
				<div className="w-full bg-sky-950 text-white py-5 px-20 flex justify-center">
					<span>Sistem informasi geografis restoran</span>
				</div>
			</div>
		</>
	);
}
