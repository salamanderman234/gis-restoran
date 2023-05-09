import { Marker } from "react-leaflet";
import { useMemo } from "react";

export default function StaticMarker({ position, details, setData }) {
	const eventHandler = useMemo(
		() => ({
			click() {
				setData(details);
			},
		}),
		[setData]
	);
	return (
		<>
			<Marker position={position} eventHandlers={eventHandler}></Marker>
		</>
	);
}
