import { useRef, useState } from "react";

export default function AddSchedulesTab({}) {
	const container = useRef(null);
	const row = (
		<div className="grid grid-cols-3 gap-2 text-sm mb-3">
			<div className="flex flex-col">
				<span className="font-bold">Hari</span>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="banner"
					type="text"
					placeholder="Banner"
				/>
			</div>
			<div className="flex flex-col">
				<span className="font-bold">Jam Buka</span>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="banner"
					type="text"
					placeholder="Banner"
				/>
			</div>
			<div className="flex flex-col">
				<span className="font-bold">Jam Tutup</span>
				<input
					className="border border-blue-500 p-2 rounded-md mt-2"
					id="banner"
					type="text"
					placeholder="Banner"
				/>
			</div>
		</div>
	);
	const add = () => {};

	return (
		<>
			<div className="container" ref={container}></div>
			<div className="w-full">
				<button className="w-full rounded-md bg-yellow-400 py-2 font-bold text-white">
					Tambah Jadwal
				</button>
			</div>
		</>
	);
}
