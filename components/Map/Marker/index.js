import dynamic from "next/dynamic";

const StaticMarker = dynamic(() => import("./Static"), {
	ssr: false,
});

export default StaticMarker;
