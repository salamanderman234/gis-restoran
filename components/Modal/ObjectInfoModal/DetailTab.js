export default function DetailTab({ details }) {
	let schedules = [];
	if ("expand" in details) {
		if ("restaurant_schedules(restaurant)" in details.expand) {
			schedules = details.expand["restaurant_schedules(restaurant)"].map((schedule) => (
				<li key={schedule.id} className="text-sm">
					<span>&bull;</span>
					<span className="mx-1">{schedule.day_name.charAt(0).toUpperCase() + schedule.day_name.slice(1)}</span>
					<span className="mx-1 text-xs">
						{schedule.open}
						{schedule.open <= 12 ? "AM" : "PM"} - {schedule.close}
						{schedule.close <= 12 ? "AM" : "PM"}
					</span>
				</li>
			));
		}
	}
	return (
		<div className="mt-3 text-xs">
			<div className="mt-3">
				<div className="flex items-start">
					<span className="mr-2 font-bold">Alamat:</span>
					<span className="leading-relaxed">{details.address}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-start">
					<span className="mr-2 font-bold">Email:</span>
					<span className="leading-relaxed">{details.email}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-start">
					<span className="mr-2 font-bold">No.Telp:</span>
					<span className="leading-relaxed">{details.phone}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-start">
					<span className="mr-2 font-bold">Jumlah Kursi:</span>
					<span className="leading-relaxed">{details.seat_amount}</span>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-start">
					<span className="mr-2 font-bold">Halal:</span>
					<span className={`leading-relaxed ${details.is_halal ? "text-green-500" : "text-red-500"}`}>{details.is_halal ? "Yes" : "No"}</span>
				</div>
			</div>
			<div className="border-t mt-3 py-3">
				<h2 className="font-semibold text-base">Jadwal Operasional</h2>
				<ul className="pl-2 mt-2">{schedules.length > 0 ? schedules : <span className="block w-full text-center">Tidak ada jadwal operasional yang bisa ditampilkan !</span>}</ul>
			</div>
		</div>
	);
}
