import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";

export default function AddForm({ position }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm({ mode: "all" });
	const { errors } = formState;

	const create = async (data) => {
		setIsLoading(true);

		const formData = new FormData();
		formData.append("lattitude", position.lat);
		formData.append("langitude", position.lng);
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("phone", data.phone);
		formData.append("address", data.address);
		formData.append("theme", data.theme);
		formData.append("is_halal", data.is_halal);
		formData.append("seat_amount", data.seat_amount);
		formData.append("image", data.image[0]);

		try {
			const record = await pb.collection("restaurants").create(formData);
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
					Nama Restoran
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
				<input
					placeholder="Masukan foto restoran"
					id="foto"
					type="file"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					accept="image/*"
					{...register("image", {
						required: "field ini harus diisi",
					})}
				/>
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
				<button disabled={isLoading} type="submit" className="bg-blue-950 text-white rounded-md py-2 px-10 font-bold">
					Submit
				</button>
			</div>
		</form>
	);
}
