export interface Task {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: priorityOptions;
	dueDate?: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	user?: User;
}
export interface TaskFormValues {
	id?: string;
	title: string;
	description?: string;
	completed?: boolean;
	priority?: priorityOptions;
	dueDate?: Date;
	userId: string;
}
export interface TaskListResponse {
	items: Task[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface TaskListParams {
	page: number;
	pageSize: number;
	completed?: string;
	priority?: "all" | priorityOptions;
	search?: string;
	sort?: string;
}
export type priorityOptions = "low" | "medium" | "high";
export type priorityOptionsExtended = "all" | priorityOptions;

export type completedFilter = "all" | "completed" | "pending";
