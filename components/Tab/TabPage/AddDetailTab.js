import { useState } from "react";

export default function AddDetailTab({ setDetailState }) {
	return (
		<>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="banner" className="font-bold">
					Banner
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="banner"
					type="text"
					placeholder="Banner"
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="nama_restoran" className="font-bold">
					Nama Restoran
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="nama_restoran"
					type="text"
					placeholder="Nama restoran"
					onChange={(e) =>
						setDetailState(
							(prev) => (prev = { ...prev, name: e.target.value })
						)
					}
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="no_telp" className="font-bold">
					No. Telp
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="no_telp"
					type="text"
					placeholder="No. Telp"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = { ...prev, phone: e.target.value })
						)
					}
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="email" className="font-bold">
					Email
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="email"
					type="email"
					placeholder="Email"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = { ...prev, email: e.target.value })
						)
					}
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="detail_alamat" className="font-bold">
					Detail Alamat
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="detail_alamat"
					type="text"
					placeholder="Detail Alamat"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = { ...prev, address: e.target.value })
						)
					}
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="tema" className="font-bold">
					Tema Restoran
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="tema"
					type="text"
					placeholder="Tema Restoran"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = { ...prev, theme: e.target.value })
						)
					}
				/>
			</div>
			<div className="flex flex-col text-sm mb-3">
				<label htmlFor="seat_amount" className="font-bold">
					Jumlah Kursi
				</label>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="seat_amount"
					type="number"
					placeholder="Jumlah Kursi"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = {
									...prev,
									seat_amount: e.target.value,
								})
						)
					}
				/>
			</div>
			<div className="text-sm mb-3">
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="is_halal"
					type="checkbox"
					onChange={(e) =>
						setDetailState(
							(prev) =>
								(prev = {
									...prev,
									is_halal: e.target.checked,
								})
						)
					}
				/>
				<label htmlFor="is_halal" className="font-bold ml-2">
					Halal
				</label>
			</div>
		</>
	);
}
