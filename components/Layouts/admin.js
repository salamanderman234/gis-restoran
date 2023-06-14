export default function AdminLayout({ children }) {
	return (
		<div className="bg-white min-h-screen">
			<div className="w-full bg-sky-950 text-white py-5 px-20 flex justify-between items-center">
				<h1 className="font-semibold text-xl">
					<span className="font-extrabold leading-loose">SI</span>{" "}
					Geografis Restoran
				</h1>
				<ul className="flex text-lg">
					<li className="mx-2 font-semibold">List</li>
					<li className="mx-2 font-semibold">Menu</li>
					<li className="mx-2 font-semibold">Galeri</li>
					<li className="mx-2 font-semibold">Service</li>
				</ul>
			</div>
			<div className="w-full p-10 text-black">{children}</div>
			<div className="w-full bg-sky-950 text-white py-5 px-20 flex justify-center">
				<span>Sistem informasi geografis restoran</span>
			</div>
		</div>
	);
}
