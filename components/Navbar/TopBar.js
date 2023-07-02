import Image from "next/image";

export default function TopBar({ logoutFunc }) {
	return (
		<div className="w-full py-5 px-10 flex justify-between bg-white z-50">
			<div>
				<span>Logo</span>
			</div>
			<ul className="text-black">
				<li className="font-semibold cursor-pointer" onClick={logoutFunc}>
					Logout
				</li>
			</ul>
		</div>
	);
}
