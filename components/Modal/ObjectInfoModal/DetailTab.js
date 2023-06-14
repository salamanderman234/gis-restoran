export default function DetailTab({ details }) {
	let schedules = [];
	if ("expand" in details) {
		if ("restaurant_schedules(restaurant)" in details.expand) {
			schedules = details.expand["restaurant_schedules(restaurant)"].map(
				(schedule) => (
					<li key={schedule.id} className="text-sm">
						<span>&bull;</span>
						<span className="mx-1">
							{schedule.day_name.charAt(0).toUpperCase() +
								schedule.day_name.slice(1)}
						</span>
						<span className="mx-1 text-xs">
							{schedule.open}
							{schedule.open <= 12 ? "AM" : "PM"} -{" "}
							{schedule.close}
							{schedule.close <= 12 ? "AM" : "PM"}
						</span>
					</li>
				)
			);
		}
	}
	return (
		<div className="mt-3 text-xs">
			<table className="border-spacing-10">
				<tbody>
					<tr className="pb-2">
						<td className="pb-2">
							<span className="font-bold block">Alamat:</span>
						</td>
						<td className="pb-2">
							<span className="leading-relaxed">
								{details.address}
							</span>
						</td>
					</tr>
					<tr className="pb-2">
						<td className="pb-2">
							<span className="font-bold block">Email:</span>
						</td>
						<td className="pb-2">
							<span className="leading-relaxed">
								{details.email}
							</span>
						</td>
					</tr>
					<tr className="pb-2">
						<td className="pb-2">
							<span className="font-bold block">No.Telp:</span>
						</td>
						<td className="pb-2">
							<span className="leading-relaxed">
								{details.phone}
							</span>
						</td>
					</tr>
					<tr className="pb-2">
						<td className="pb-2 w-1/3">
							<span className="font-bold block">
								Jumlah Kursi:
							</span>
						</td>
						<td className="pb-2">
							<span className="leading-relaxed">
								{details.seat_amount}
							</span>
						</td>
					</tr>
					<tr className="pb-2">
						<td className="pb-2">
							<span className="font-bold block">Halal:</span>
						</td>
						<td className="pb-2">
							<span
								className={`leading-relaxed ${
									details.is_halal
										? "text-green-500"
										: "text-red-500"
								}`}
							>
								{details.is_halal ? "Yes" : "No"}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="border-t mt-3 py-3">
				<h2 className="font-semibold text-base">Jadwal Operasional</h2>
				<ul className="pl-2 mt-2">
					{schedules.length > 0 ? (
						schedules
					) : (
						<span className="block w-full text-center">
							Tidak ada jadwal operasional yang bisa ditampilkan !
						</span>
					)}
				</ul>
			</div>
		</div>
	);
}
