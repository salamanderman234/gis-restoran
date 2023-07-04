import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import RoutingMachine from "./RoutingMachine";

export default function Map({ children, position, direction }) {
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
			{direction && <RoutingMachine direction={direction} />}
			<MarkerClusterGroup chunkedLoading>{children}</MarkerClusterGroup>
		</MapContainer>
	);
}
