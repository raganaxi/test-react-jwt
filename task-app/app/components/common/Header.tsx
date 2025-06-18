import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
// src/components/common/Header.tsx
import {
	Breadcrumb,
	Dropdown,
	Layout,
	type MenuProps,
	Space,
	Typography,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

// Simulación: nombre de usuario actual
const currentUser = {
	name: "Antonio",
};

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	// Breadcrumbs dinámicos
	const pathSnippets = location.pathname.split("/").filter((i) => i);
	const breadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
		return {
			key: url,
			title: url.replace("/", "").toUpperCase(),
		};
	});

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const items: MenuProps["items"] = [
		{
			label: "Logout",
			key: "1",
			icon: <LogoutOutlined />,
		},
	];

	const menuProps = {
		items,
		onClick: handleLogout,
	};

	return (
		<AntHeader className="bg-white dark:bg-gray-900 flex justify-between items-center px-4 shadow">
			<Space direction="vertical" size={0}>
				<Title level={5} className="mb-0">
					{breadcrumbItems[breadcrumbItems.length - 1]?.title || "Dashboard"}
				</Title>
				<Breadcrumb items={breadcrumbItems} />
			</Space>

			<Dropdown trigger={["click"]} menu={menuProps}>
				<div className="cursor-pointer flex items-center gap-2 text-gray-800 dark:text-white">
					<UserOutlined />
					<span>{user?.name || "User"}</span>
				</div>
			</Dropdown>
		</AntHeader>
	);
}
