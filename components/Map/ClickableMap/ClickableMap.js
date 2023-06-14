import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

export default function ClickableMap({ children, position, clickHandler }) {
	const MapHandler = () => {
		useMapEvents({
			click: (e) => {
				clickHandler(e.latlng);
			},
		});
		return null;
	};
	return (
		<MapContainer
			className="map"
			center={position}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
			<MapHandler />
		</MapContainer>
	);
}
