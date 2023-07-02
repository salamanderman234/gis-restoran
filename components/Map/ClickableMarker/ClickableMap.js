import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import AddMarkerModal from "../../Modal/AddMarkerModal";

export default function Map({ children, position }) {
	const [viewModal, setViewModal] = useState(false);
	const [newDataPosition, setNewDataPosition] = useState(position);

	const toggleModal = () => setViewModal(!viewModal);

	const MapEvents = () => {
		useMapEvents({
			click: (e) => {
				toggleModal();
				setNewDataPosition(e.latlng);
				console.log("asiap");
			},
		});
		return null;
	};
	return (
		<>
			<MapContainer className="map" center={position} zoom={13} scrollWheelZoom={false}>
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{children}
				<MapEvents />
			</MapContainer>
			{viewModal && <AddMarkerModal position={newDataPosition} onClose={toggleModal} />}
		</>
	);
}
