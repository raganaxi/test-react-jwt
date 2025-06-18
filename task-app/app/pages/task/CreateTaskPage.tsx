import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router";
import TaskForm from "~/components/tasks/TaskForm";
import { useToast } from "~/context/ToastContext";
import { createTask } from "~/services/taskService";
import type { TaskFormValues } from "../../types/task";

export default function CreateTaskPage() {
	const navigate = useNavigate();
	const { showToast } = useToast();

	const handleSubmit = async (data: TaskFormValues) => {
		try {
			await createTask(data);
			navigate("/tasks/dashboard");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response && error.response.status === 400) {
					// validation error and nest js messages
					const errorMessage = error.response.data.message || "Bad Request";

					//show toast warning if errorMessage is Array
					if (Array.isArray(errorMessage)) {
						for (const msg of errorMessage) {
							showToast(msg, "warning");
						}
					} else {
						console.warn(errorMessage);
					}
				}
			}
		}
	};

	return (
		<div>
			<div className="max-w-2xl mx-auto flex justify-end">
				<NavLink
					to="/tasks/dashboard"
					className="text-blue-600 hover:underline"
				>
					Back to Dashboard
				</NavLink>
			</div>

			<div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10 space-y-4">
				<h2 className="text-2xl font-bold text-slate-800 mb-4">Create Task</h2>
				<TaskForm onFinish={handleSubmit} />
			</div>
		</div>
	);
}
