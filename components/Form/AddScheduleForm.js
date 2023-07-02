import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AddScheduleForm({ restaurant }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm({ mode: "all" });
	const { errors } = formState;

	const create = async (data) => {
		setIsLoading(true);

		try {
			data.restaurant = restaurant.id;
			const record = await pb.collection("restaurant_schedules").create(data);
			router.push(`/admin/restaurants/detail/${restaurant.id}`);
		} catch (e) {
			alert(e);
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit(create)}>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Hari
				</label>
				<select
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("day_name", {
						required: "field ini harus diisi",
					})}
				>
					<option value={"senin"}>Senin</option>
					<option value={"selasa"}>Selasa</option>
					<option value={"rabu"}>Rabu</option>
					<option value={"kamis"}>Kamis</option>
					<option value={"jumat"}>Jumat</option>
					<option value={"sabtu"}>Sabtu</option>
					<option value={"minggu"}>Minggu</option>
				</select>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.day_name?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Open
				</label>
				<input
					placeholder="Masukan jam buka restoran"
					id="theme"
					type="number"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("open", {
						required: "field ini harus diisi",
						max: 24,
						min: 0,
						valueAsNumber: true,
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.open?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Close
				</label>
				<input
					placeholder="Masukan jam tutup"
					id="theme"
					type="number"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("close", {
						required: "field ini harus diisi",
						max: 24,
						min: 0,
						valueAsNumber: true,
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.close?.message}</span>
				</div>
			</div>
			<div className="mt-2 flex justify-center">
				<button disabled={isLoading} type="submit" className="bg-blue-950 text-white rounded-md py-2 px-10 font-bold mr-3">
					Submit
				</button>
				<Link className="bg-red-600 text-white rounded-md py-2 px-10 font-bold" href={"/admin/restaurants"}>
					Kembali
				</Link>
			</div>
		</form>
	);
}
