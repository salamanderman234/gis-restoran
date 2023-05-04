import { Inter } from "next/font/google";
import Map from "@/components/Map";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div className="center">
			<div className="map-wrapper">
				<Map position={[51.505, -0.09]} />
			</div>
		</div>
	);
}
