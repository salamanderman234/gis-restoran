import dynamic from "next/dynamic";

const DefaultMarker = dynamic(() => import("./Default"), {
	ssr: false,
});

export default DefaultMarker;
