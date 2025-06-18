import axios from "~/utils/axios";
import { clearSession, setToken, setUser } from "../utils/authCookie";

export async function loginUser(email: string, password: string) {
	try {
		const res = await axios.post<LoginResponse>("/auth/login", {
			email,
			password,
		});
		const accessToken = res.data.access_token;
		setToken(accessToken);
		const user = res.data.user;
		setUser(user);
		return res.data;
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
}
// Logout
export function logoutUser() {
	clearSession();
}

// Register
export async function registerUser(
	email: string,
	name: string,
	password: string,
) {
	const res = await axios.post<User>("/register", {
		email,
		name,
		password,
	});
	return res.data;
}

export async function getUserProfile(token?: string) {
	const res = await axios.get<User>("/auth/profile");
	return res.data;
}
