import dynamic from "next/dynamic";

const ClickableMap = dynamic(() => import("./ClickableMap"), {
	ssr: false,
});

export default ClickableMap;
