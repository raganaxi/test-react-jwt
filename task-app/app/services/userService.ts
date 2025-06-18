// src/services/userService.ts
import axios from "~/utils/axios";

export const getUsers = async (): Promise<User[]> => {
	const response = await axios.get<User[]>("/users");
	return response.data;
};
