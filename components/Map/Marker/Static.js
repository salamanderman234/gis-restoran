import { Marker } from "react-leaflet";
import { Icon, Point } from "leaflet";
import { useMemo } from "react";

export default function StaticMarker({ position, details, setData, selected }) {
	const defaultIcon = new Icon({
		iconUrl: "https://gis-restoran.vercel.app/icons/restaurant.png",
		iconSize: new Point(40, 40),
	});

	const selectedIcon = new Icon({
		iconUrl: "https://gis-restoran.vercel.app/icons/selected-icon.png",
		iconSize: new Point(55, 55),
	});

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
			<Marker icon={selected.lattitude === details.lattitude && selected.langitude === details.langitude ? selectedIcon : defaultIcon} position={position} eventHandlers={eventHandler}></Marker>
		</>
	);
}
