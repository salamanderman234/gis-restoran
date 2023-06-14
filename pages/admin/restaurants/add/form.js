import AdminLayout from "@/components/Layouts/admin";
import Map from "@/components/Map";
import DefaultMarker from "@/components/Map/Marker/Default";

export default function AddForm({ lat, lng }) {
	const position = {
		lat,
		lng,
	};
	return (
		<AdminLayout>
			<div style={{ height: 480 }}>
				<div className="w-full h-full grid grid-cols-3 gap-10">
					<div className="w-full h-full">
						<Map position={position}>
							<DefaultMarker position={position} />
						</Map>
					</div>
					<div className="col-span-2">
						<h1 className="font-bold text-2xl">Tambah Restoran</h1>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}

export async function getServerSideProps(context) {
	const lat = context.query.lat;
	const lng = context.query.lng;

	return {
		props: {
			lat,
			lng,
		},
	};
}
