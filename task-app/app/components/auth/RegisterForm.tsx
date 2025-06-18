import { AxiosError } from "axios";
// components/auth/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import FormInput from "~/components/common/FormInput";
import { registerUser } from "~/services/authService";
import type { RegisterForm as RegisterFormSchema } from "~/types/auth/register.schema";
import { useToast } from "../../context/ToastContext";

export default function RegisterForm() {
	const navigate = useNavigate();
	const { showToast } = useToast();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormSchema>();

	const password = watch("password");

	const onSubmit = async (data: RegisterFormSchema) => {
		try {
			await registerUser(data.email, data.name, data.password);
			showToast("Registro exitoso. Inicia sesión", "success");
			navigate("/login");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400) {
					showToast(
						error.response.data.message || "Error en el registro",
						"warning",
					);
				} else {
					showToast("Ocurrió un error. Intenta más tarde.", "error");
				}
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-8 rounded-xl shadow-md w-full max-w-md space-y-4 mx-auto my-10"
			style={{ maxWidth: "400px" }}
		>
			<h2 className="text-2xl font-bold text-center">Register</h2>

			<FormInput
				id="email"
				type="email"
				label="Email"
				placeholder="you@example.com"
				registration={register("email", {
					required: "El email es obligatorio",
				})}
				error={errors.email}
			/>

			<FormInput
				id="name"
				type="text"
				label="Nombre"
				placeholder="Tu nombre"
				registration={register("name", {
					required: "El nombre es obligatorio",
				})}
				error={errors.name}
			/>

			<FormInput
				id="password"
				type="password"
				label="Contraseña"
				registration={register("password", {
					required: "La contraseña es obligatoria",
					minLength: { value: 6, message: "Mínimo 6 caracteres" },
				})}
				error={errors.password}
			/>

			<FormInput
				id="confirmPassword"
				type="password"
				label="Confirmar contraseña"
				registration={register("confirmPassword", {
					required: "Confirma tu contraseña",
					validate: (value) =>
						value === password || "Las contraseñas no coinciden",
				})}
				error={errors.confirmPassword}
			/>

			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
			>
				Registrarse
			</button>

			<p className="text-center text-sm">
				¿Do you have an account?{" "}
				<NavLink to="/login" className="text-blue-600 hover:underline">
					Sign In
				</NavLink>
			</p>
		</form>
	);
}
