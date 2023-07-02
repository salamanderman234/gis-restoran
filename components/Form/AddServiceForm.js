import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AddServiceForm({ restaurant, services }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm({ mode: "all" });
	const { errors } = formState;

	const create = async (data) => {
		setIsLoading(true);

		try {
			data.restaurant = restaurant.id;
			const record = await pb.collection("restaurant_services").create(data);
			router.push(`/admin/restaurants/detail/${restaurant.id}`);
		} catch (e) {
			alert(e);
		}
		setIsLoading(false);
	};

	const servicesList = services.map((service, index) => (
		<option key={index} value={service.id}>
			{service.name}
		</option>
	));

	return (
		<form onSubmit={handleSubmit(create)}>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="nama">
					Service
				</label>
				<select
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("service", {
						required: "field ini harus diisi",
					})}
				>
					{servicesList}
				</select>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.service?.message}</span>
				</div>
				<div className="mt-2 flex justify-center">
					<button disabled={isLoading} type="submit" className="bg-blue-950 text-white rounded-md py-2 px-10 font-bold mr-3">
						Submit
					</button>
					<Link className="bg-red-600 text-white rounded-md py-2 px-10 font-bold" href={"/admin/restaurants"}>
						Kembali
					</Link>
				</div>
			</div>
		</form>
	);
}
