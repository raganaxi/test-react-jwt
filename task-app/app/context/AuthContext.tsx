import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "react-router";
import {
	clearSession,
	getToken,
	getUser,
	setToken,
	setUser,
} from "~/utils/authCookie";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setTokenState] = useState<string>("");
	const [user, setUserState] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Solo se ejecuta en cliente
		const token = getToken();
		const user = getUser();

		if (token && user) {
			setTokenState(token);
			setUserState(user);
		}
		setIsLoading(false);
	}, []);

	const login = (token: string, user: User) => {
		setToken(token);
		setUser(user);
		setTokenState(token);
		setUserState(user);
	};

	const logout = () => {
		clearSession();
		setTokenState("");
		setUserState(null);
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				isAuthenticated: !!token,
				isLoading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export function requireAuth() {
	const token = getToken(); // Desde cookie o localStorage
	if (!token) {
		throw redirect("/login"); // IMPORTANTE: importar desde remix
	}
}
