import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ direction }) => {
	const target = direction.target;
	const current = direction.current;
	const instance = L.Routing.control({
		waypoints: [
			L.latLng(target[0], target[1]),
			L.latLng(current[0], current[1]),
		],
		// show: false,
		// addWaypoints: false,
		// routeWhileDragging: true,
		// fitSelectedRoutes: true,
		// showAlternatives: false,
	});

	return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
