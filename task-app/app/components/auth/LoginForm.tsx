import { AxiosError } from "axios";
// components/auth/LoginForm.tsx
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useToast } from "~/context/ToastContext";
import { loginUser } from "~/services/authService";
import { useAuth } from "../../context/AuthContext";
import LoginInput from "../common/FormInput";

type LoginFormValues = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const onSubmit = async (data: LoginFormValues) => {
		try {
			const res = await loginUser(data.email, data.password);
			if (res?.access_token && res.user) {
				login(res.access_token, res.user);
			}
			showToast("Login exitoso", "success");
			navigate("/tasks/dashboard");
		} catch (error) {
			console.error("Login failed:", error);
			
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-4 mx-auto my-10"
			style={{ maxWidth: "400px" }}
		>
			<h2 className="text-2xl font-bold text-center mb-4">Login</h2>

			<LoginInput
				id="email"
				label="Email"
				type="email"
				placeholder="you@example.com"
				registration={register("email", { required: "Email is required" })}
				error={errors.email}
			/>

			<LoginInput
				id="password"
				label="Password"
				type="password"
				placeholder="••••••••"
				registration={register("password", {
					required: "Password is required",
				})}
				error={errors.password}
			/>

			<button
				type="submit"
				className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
			>
				Login
			</button>

			<p className="text-center text-sm mt-4">
				Don’t have an account?{" "}
				<NavLink to="/register" className="text-blue-600 hover:underline">
					Register
				</NavLink>
			</p>
		</form>
	);
}
