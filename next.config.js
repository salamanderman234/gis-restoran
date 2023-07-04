/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "gis-restoran.pockethost.io",
				port: "",
				pathname: "/api/files/**",
			},
		],
	},
	transpilePackages: ["react-leaflet-cluster"],
};

module.exports = nextConfig;
