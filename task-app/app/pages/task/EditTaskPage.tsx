import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import TaskForm from "~/components/tasks/TaskForm";
import { useToast } from "~/context/ToastContext";
import { getTaskById, updateTask } from "../../services/taskService";
import type { TaskFormValues } from "../../types/task";

export default function EditTaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState<TaskFormValues | null>(null);
	const { showToast } = useToast();

	useEffect(() => {
		if (id) {
			getTaskById(id).then((data) => {
				console.log(data);
				setTask({
					...data,
					dueDate: data.dueDate ? dayjs(data.dueDate) : new Date(),
				});
			});
		}
	}, [id]);

	const handleSubmit = async (data: TaskFormValues) => {
		try {
			await updateTask(id, data);
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
				{task ? (
					<>
						<h2 className="text-2xl font-bold text-slate-800 mb-4">
							Edit Task
						</h2>
						<TaskForm initialValues={task} onFinish={handleSubmit} />
					</>
				) : (
					<p>Loading task...</p>
				)}
			</div>
		</div>
	);
}
