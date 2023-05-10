export default function DetailModal({ children }) {
	return (
		<div className="absolute z-50 h-screen w-screen bg-black brightness-50 flex justify-center items-center">
			<div className="bg-white rounded-md w-1/4">{children}</div>
		</div>
	);
}
