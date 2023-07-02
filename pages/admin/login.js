import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/router";

export default function Admin() {
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const router = useRouter();

	useEffect(() => {
		if (pb.authStore.isValid) {
			router.push("/admin");
		}
	}, []);

	const login = async (data) => {
		setIsLoading(true);
		try {
			const authData = await pb.admins.authWithPassword(data.email, data.password);
			router.push("/admin/restaurants");
		} catch (e) {
			alert(e);
		}
		setIsLoading(false);
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/previews/006/986/565/large_2x/modern-simple-royal-blue-gradient-abstract-background-quotes-and-presentation-types-based-background-design-it-is-suitable-for-wallpaper-quotes-website-opening-presentation-personal-profile-etc-free-photo.jpg')]">
			<div className="bg-white rounded-md p-10 text-black">
				<h1 className="text-center font-bold text-2xl tracking-wide">Login</h1>
				<form className="mt-10" onSubmit={handleSubmit(login)}>
					<div className="flex flex-col justify-center my-3">
						<label className="text-sm" htmlFor="email">
							Email
						</label>
						<input
							className="w-full mt-2 rounded-md border p-3"
							disabled={isLoading}
							required
							id="email"
							type="email"
							name="email"
							autoComplete="off"
							placeholder="Masukan email"
							{...register("email", {
								required: "field ini harus diisi",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "format email tidak valid",
								},
							})}
						/>
						<div className="flex justify-end text-red-600 text-xs">
							<span>{errors.email?.message}</span>
						</div>
					</div>
					<div className="flex flex-col justify-center my-3">
						<label className="text-sm" htmlFor="password">
							Password
						</label>
						<input
							className="w-full mt-2 rounded-md border p-3"
							disabled={isLoading}
							id="password"
							type="password"
							name="password"
							placeholder="Masukan password"
							{...register("password", {
								required: "field ini harus diisi",
							})}
						/>
						<div className="flex justify-end text-red-600 text-xs">
							<span>{errors.password?.message}</span>
						</div>
					</div>

					<button type="submit" className={`w-full rounded-md mt-5 text-white bg-sky-600 py-2 ${isLoading ? "opacity-50" : ""}`} disabled={isLoading}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const text = pb.authStore.loadFromCookie(context.cookie);
	console.log(text);
	return {
		props: {},
	};
}
