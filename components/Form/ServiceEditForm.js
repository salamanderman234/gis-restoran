import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditForm({ data }) {
	const [restaurant, setRestaurant] = useState(data);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm({
		mode: "all",
		defaultValues: {
			service: data.expand.service.id,
		},
	});
	const { errors } = formState;

	const create = async (data) => {
		setIsLoading(true);
		try {
			const record = await pb.collection("restaurants").update(data.id, data);
			router.push("/admin/restaurants");
		} catch (e) {
			alert(e);
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit(create)}>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="nama">
					Service
				</label>
				<input
					placeholder="Masukan nama restoran"
					id="nama"
					type="text"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("name", {
						required: "field ini harus diisi",
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.name?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="foto">
					Foto Restoran
				</label>
				<input placeholder="Masukan foto restoran" id="foto" type="file" className="border px-2 text-sm py-2 rounded-md border-blue-900" accept="image/*" {...register("image")} />
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.image?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="phone">
					Phone
				</label>
				<input
					placeholder="Masukan no.telp restoran"
					id="phone"
					type="text"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("phone", {
						required: "field ini harus diisi",
						pattern: {
							value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
							message: "nomor telepon tidak valid",
						},
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.phone?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="email">
					Email
				</label>
				<input
					placeholder="Masukan no.telp restoran"
					id="email"
					type="email"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("email", {
						required: "field ini harus diisi",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "format email tidak valid",
						},
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.email?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="detail">
					Detail Alamat
				</label>
				<textarea
					id="detail"
					placeholder="Detail alamat restoran"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("address", {
						required: "field ini harus diisi",
					})}
				></textarea>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.address?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Tema
				</label>
				<input
					placeholder="Masukan tema restoran"
					id="theme"
					type="text"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("theme", {
						required: "field ini harus diisi",
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.theme?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="seat">
					Jumlah Kursi
				</label>
				<input
					placeholder="Masukan jumlah kursi"
					id="seat"
					type="number"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("seat_amount", {
						required: "field ini harus diisi",
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.seat_amount?.message}</span>
				</div>
			</div>
			<div className="mb-3">
				<input type="checkbox" className="mr-1" {...register("is_halal")} />
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Halal
				</label>
			</div>
			<div className="mt-2 flex justify-center">
				<button disabled={isLoading} type="submit" className="bg-blue-950 text-white rounded-md py-2 px-10 font-bold mr-2">
					Submit
				</button>
				<Link className="bg-red-600 text-white rounded-md py-2 px-10 font-bold" href={"/admin/restaurants"}>
					Kembali
				</Link>
			</div>
		</form>
	);
}
