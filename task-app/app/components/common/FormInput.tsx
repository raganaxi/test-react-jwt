// components/auth/LoginInput.tsx
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
	label: string;
	type: string;
	id: string;
	placeholder?: string;
	registration: UseFormRegisterReturn;
	error?: FieldError;
};

export default function LoginInput({
	label,
	type,
	id,
	placeholder,
	registration,
	error,
}: Props) {
	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium text-shadow-gray-100">
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				{...registration}
				className={`w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
					error ? "border-red-500 ring-red-300" : "ring-blue-500"
				}`}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
}
