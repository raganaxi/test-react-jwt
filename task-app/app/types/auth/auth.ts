type AuthContextType = {
	token: string;
	user: User | null;
	isAuthenticated: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
	isLoading: boolean;
};

interface LoginResponse {
	access_token: string;
	user: User;
}
