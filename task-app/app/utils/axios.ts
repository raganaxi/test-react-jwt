import { notification } from "antd";
import axios from "axios";
import { clearSession, getToken } from "./authCookie";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Interceptor que obtiene el token en cada request
instance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// interceptor para manejar errores globalmente
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// status code 401: Unauthorized and 400: Bad Request
		if (error.response && error.response.status === 401) {
			notification.open({
				message: error.response.message,
				description: "Please return to login",
				duration: 3,
				pauseOnHover: true,
				type: "info",
			});
			// console.log(error);
			clearSession();
			if (typeof window !== "undefined") {
				window.location.replace("/login");
				// redirect client side to login
			}
			// Redirigir al usuario a la página de login
		}
		if (error.response && error.response.status === 400) {
			// validation error and nest js messages
			const errorMessage = error.response.data.message || "Bad Request";

			//show toast warning if errorMessage is Array
			if (Array.isArray(errorMessage)) {
				for (const msg of errorMessage) {
					console.warn(msg);
					notification.open({
						message: "Bad Request Validation Warning",
						description: msg,
						duration: 3,
						pauseOnHover: true,
						type: "warning",
					});
				}
			} else {
				console.warn(errorMessage);
			}
		}
		return Promise.reject(error);
	},
);

export default instance;
