export default function AddMarkerModal() {
	return (
		<div className="bg-white rounded-md absolute">
			<h2>Add marker</h2>
			<ul>
				<li>Detail</li>
				<li>Menu</li>
				<li>Galeri</li>
			</ul>
			<form className="overflow-auto w-full">
				<div className="flex">
					<label>Nama</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>Tema</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>Alamat</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>Email</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>No. Telp</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>Jumlah Kursi</label>
					<input type="text" placeholder="Nama Restoran" required />
				</div>
				<div className="flex">
					<label>Halal</label>
					<div>
						<input type="radio" value={1} name="is_halal" required />
						<label>Yes</label>
						<input type="radio" value={0} name="is_halal" required />
						<label>No</label>
					</div>
				</div>
			</form>
		</div>
	);
}
