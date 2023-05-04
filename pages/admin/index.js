import { Record, Admin } from "pocketbase";
import { pb } from "@/lib/pocketbase";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
	const router = useRouter();

	const logout = async () => {
		pb.authStore.clear();
		router.push("/admin/login");
	};

	useEffect(() => {
		if (!pb.authStore.isValid || !pb.authStore.model instanceof Admin) {
			router.push("/admin/login");
		}
	}, []);
	return (
		<div>
			<span>Ini halaman admin</span>
			<button onClick={logout}>Logout</button>
		</div>
	);
}
