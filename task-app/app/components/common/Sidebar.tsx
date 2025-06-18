import { UnorderedListOutlined } from "@ant-design/icons";
// src/components/common/Sidebar.tsx
import { Layout, Menu } from "antd";
import { ClockPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const { Sider } = Layout;

export default function Sidebar() {
	const navigate = useNavigate();
	const [selectedKey, setSelectedKey] = useState<string>("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setSelectedKey(window.location.pathname);
		}
	}, []);
	const handleClick = ({ key }: { key: string }) => {
		navigate(key);
	};

	const menuItems = [
		{
			key: "/tasks/dashboard",
			icon: <UnorderedListOutlined />,
			label: "Dashboard",
			path: "/tasks/dashboard",
		},
		{
			key: "/tasks/create",
			icon: <ClockPlus />,
			label: "Create Task",
			path: "/tasks/create",
		},
	];

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			zeroWidthTriggerStyle={{ top: "12px" }}
		>
			<div className="text-white text-center p-4 font-bold text-xl">MyApp</div>
			<Menu
				theme="dark"
				mode="inline"
				onClick={handleClick}
				items={menuItems}
				selectedKeys={[selectedKey]}
			/>
		</Sider>
	);
}
