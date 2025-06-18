import { Tooltip } from 'antd';

interface AvatarProps {
	fullName: string | undefined;
}

const getInitials = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0].toUpperCase())
		.join("")
		.slice(0, 2);

export default function Avatar({ fullName }: AvatarProps) {
	const initials = getInitials(fullName || "Unknown");
	const text = fullName ? `Assigned to: ${fullName}` : "No user assigned";
	return (
		<div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
			<Tooltip placement="top" title={text}>
				<span className="text-sm font-semibold">{initials}</span>
			</Tooltip>
		</div>
	);
}
