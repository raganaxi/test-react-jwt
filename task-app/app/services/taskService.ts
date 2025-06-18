import type { Task, TaskListParams, TaskListResponse } from "../types/task";
import axios from "../utils/axios";

export const getTasks = async (): Promise<Task[]> => {
	const res = await axios.get("/tasks");
	return res.data;
};

export const getTaskList = async (
	params?: TaskListParams,
): Promise<TaskListResponse> => {
	const res = await axios.get("/tasks/list", { params });
	return res.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
	const res = await axios.get(`/tasks/${id}`);
	console.log(res.data);
	return res.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
	const res = await axios.post("/tasks", {
		...task,
		dueDate: task.dueDate ? new Date(task.dueDate) : null,
	});
	return res.data;
};

export const updateTask = async (
	id: string,
	task: Partial<Task>,
): Promise<Task> => {
	const res = await axios.put(`/tasks/${id}`, task);
	return res.data;
};

export const toggleTaskCompleted = async (id: string) => {
	return await axios.patch(`/tasks/toggle/${id}`);
};

export const deleteTask = async (id: string): Promise<void> => {
	await axios.delete(`/tasks/${id}`);
};
