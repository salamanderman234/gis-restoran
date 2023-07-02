import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditMenuForm({ menuData, restaurant }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm({
		mode: "all",
		defaultValues: {
			name: menuData.name,
			price: menuData.price,
			description: menuData.description,
		},
	});
	const { errors } = formState;

	const create = async (data) => {
		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.append("restaurant", restaurant.id);
			formData.append("name", data.name);
			formData.append("price", data.price);
			formData.append("description", data.description);
			formData.append("banner", "/");
			if (data.image.length > 0) {
				formData.append("image", data.image[0]);
			}
			const record = await pb.collection("menus").update(menuData.id, formData);
			router.push("/admin/restaurants");
		} catch (e) {
			alert(e);
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit(create)}>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Image
				</label>
				<input placeholder="Masukan gambar menu" id="theme" type="file" accept="image/*" className="border px-2 text-sm py-2 rounded-md border-blue-900" {...register("image")} />
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.service?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Nama Menu
				</label>
				<input
					placeholder="Masukan nama menu"
					id="theme"
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
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Harga
				</label>
				<input
					placeholder="Masukan harga menu"
					id="theme"
					type="text"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("price", {
						required: "field ini harus diisi",
						valueAsNumber: true,
						pattern: {
							value: /^(0|[1-9]\d*)(\.\d+)?$/,
						},
						min: 0,
					})}
				/>
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.price?.message}</span>
				</div>
			</div>
			<div className="flex flex-col mb-3">
				<label className="mb-1 text-sm font-semibold" htmlFor="theme">
					Deskripsi
				</label>
				<textarea
					placeholder="Masukan detail menu"
					id="theme"
					type="text"
					className="border px-2 text-sm py-2 rounded-md border-blue-900"
					{...register("description", {
						required: "field ini harus diisi",
					})}
				></textarea>
				<input />
				<div className="flex justify-end text-red-600 text-xs mt-2">
					<span>{errors.description?.message}</span>
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
