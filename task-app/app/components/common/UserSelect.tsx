import { getUsers } from "@/services/userService";
import { Select } from "antd";
import type React from "react";
import { useEffect, useState } from "react";

const { Option } = Select;

interface Props {
	onChange: (userId: string) => void;
	value?: string;
}

const UserSelect: React.FC<Props> = ({ onChange, value }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadUsers = async () => {
			setLoading(true);
			try {
				const users = await getUsers();
				setUsers(users);
			} catch (error) {
				console.error("Error al cargar usuarios", error);
			} finally {
				setLoading(false);
			}
		};

		loadUsers();
	}, []);

	return (
		<Select
			showSearch
			placeholder="Selecciona un usuario"
			optionFilterProp="label"
			value={value}
			onChange={onChange}
			loading={loading}
			className="w-full"
			options={users.map((user) => ({
				label: `${user.name || "unknown"} (${user.email})`,
				value: user.id,
			}))}
		/>
	);
};

export default UserSelect;
