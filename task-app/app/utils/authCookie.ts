import Cookies from "js-cookie";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user"; // opcional si guardas el user

export const getToken = () => Cookies.get(TOKEN_KEY);
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token);
export const removeToken = () => Cookies.remove(TOKEN_KEY);

export const getUser = (): User | null => {
	const user = Cookies.get(USER_KEY);
	return user ? JSON.parse(user) : null;
};
export const setUser = (user: User) =>
	Cookies.set(USER_KEY, JSON.stringify(user));
export const removeUser = () => Cookies.remove(USER_KEY);

export const clearSession = async () => {
	removeToken();
	removeUser();
};
