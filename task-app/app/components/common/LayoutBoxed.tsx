import { Outlet } from "react-router";

export default function LayoutBoxed() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md rounded-xl p-8">
				<Outlet />
			</div>
		</div>
	);
}
