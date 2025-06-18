import { Button } from "antd";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import Avatar from "../../components/tasks/Avatar";
import CompletedTask from "../../components/tasks/CompletedTask";
import DueDate from "../../components/tasks/DueDate";
import { getTaskById } from "../../services/taskService";
import type { Task, priorityOptions } from "../../types/task";

export default function ViewTaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState<Task | null>(null);

	useEffect(() => {
		if (id) {
			getTaskById(id).then(setTask);
		}
	}, [id]);

	const priorityColors: Record<priorityOptions, string> = {
		low: "bg-green-100 text-green-700",
		medium: "bg-yellow-100 text-yellow-700",
		high: "bg-red-100 text-red-700",
	};

	return (
		<>
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
						{/* Header con prioridad */}
						<div className="flex items-center justify-between">
							<span
								className={`text-xs font-medium px-3 py-1 rounded-full uppercase ${priorityColors[task.priority]}`}
							>
								{task.priority}
							</span>
							<Avatar fullName={task.user?.name} />
						</div>

						{/* Título */}
						<h2 className="text-2xl font-bold text-slate-800">
							{task.title}{" "}
							<Button
								type="primary"
								className="mb-4"
								onClick={() => navigate(`/tasks/edit/${id}`)}
								icon={<Edit className="w-4 h-4" />}
							/>
						</h2>

						{/* Descripción */}
						<p className="text-slate-600 leading-relaxed">{task.description}</p>

						{/* Footer con fecha */}
						<div className="pt-4 border-t border-slate-200">
							<DueDate dueDate={task.dueDate} />
							<CompletedTask completed={task.completed} />
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
}
