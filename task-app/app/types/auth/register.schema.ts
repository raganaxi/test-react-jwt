import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type RegisterForm = z.infer<typeof registerSchema>;
