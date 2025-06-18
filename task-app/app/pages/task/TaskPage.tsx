import { Button, Popconfirm, Select, Space, Table, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
	deleteTask,
	getTaskList,
	toggleTaskCompleted,
} from "~/services/taskService";
import type {
	Task,
	TaskListParams,
	priorityOptionsExtended,
} from "~/types/task";
const { Option } = Select;

export default function TaskPage() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const completed = searchParams.get("completed") || "all";
	const page = Number.parseInt(searchParams.get("page") || "1", 10);
	const pageSize = Number.parseInt(searchParams.get("pageSize") || "10", 10);
	const priority = (searchParams.get("priority") ||
		"all") as priorityOptionsExtended;
	const search = searchParams.get("search") || "";
	const sort = searchParams.get("sort") || "createdAt-desc";

	const navigate = useNavigate();

	const loadTasks = useCallback(async () => {
		setLoading(true);
		const params: TaskListParams = {
			page,
			pageSize,
		};
		if (completed === "completed") params.completed = "true";
		if (completed === "pending") params.completed = "false";
		if (priority !== "all") params.priority = priority;
		if (search) params.search = search;
		if (sort) params.sort = sort;

		try {
			const { items, total } = await getTaskList(params);
			setTasks(items);
			setTotal(total);
		} finally {
			setLoading(false);
		}
	}, [completed, page, pageSize, priority, search, sort]);

	const handleDelete = async (id: string) => {
		await deleteTask(id);
		loadTasks();
	};
	const handleToggleComplete = async (id: string) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task,
		);
		setTasks(updatedTasks);
		try {
			await toggleTaskCompleted(id);
		} catch (error) {
			// Revert changes if update fails
			setTasks(tasks);
			console.error("Failed to update task:", error);
		}
	};

	useEffect(() => {
		loadTasks();
	}, [loadTasks]);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Completed",
			dataIndex: "completed",
			key: "completed",
			render: (value: boolean) => (value ? "Yes" : "No"),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority",
			render: (value: string) => {
				switch (value) {
					case "low":
						return <Tag color="green">Low</Tag>;
					case "medium":
						return <Tag color="orange">Medium</Tag>;
					case "high":
						return <Tag color="red">High</Tag>;
					default:
						return <Tag color="default">Unknown</Tag>;
				}
			},
		},
		{
			title: "Due Date",
			dataIndex: "dueDate",
			key: "dueDate",
			render: (date: string) => new Date(date).toLocaleDateString(),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, task: Task) => (
				<Space>
					<Button onClick={() => navigate(`/tasks/view/${task.id}`)}>
						View
					</Button>
					<Button onClick={() => navigate(`/tasks/edit/${task.id}`)}>
						Edit
					</Button>
					<Popconfirm
						title="Delete this task?"
						onConfirm={() => handleDelete(task.id)}
					>
						<Button danger>Delete</Button>
					</Popconfirm>
					<Popconfirm
						title="Are you sure toggle complete?"
						onConfirm={() => handleToggleComplete(task.id)}
					>
						<Button>
							{task.completed ? "Mark Incomplete" : "Mark Complete"}
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	const handlePaginationChange = (page: number, pageSize: number) => {
		setSearchParams({
			page: page.toString(),
			pageSize: pageSize.toString(),
			completed,
		});
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Tasks</h1>
				<div className="flex gap-2 items-center">
					<Select
						value={completed}
						onChange={(val) =>
							setSearchParams({
								completed: val,
								page: "1",
								pageSize: "10",
								priority,
								search: "",
							})
						}
						style={{ width: 130 }}
					>
						<Option value="all">All</Option>
						<Option value="completed">Completed</Option>
						<Option value="pending">Pending</Option>
					</Select>
					<Select
						value={priority}
						onChange={(val) =>
							setSearchParams({
								completed,
								page: "1",
								priority: val,
								search: "",
							})
						}
						style={{ width: 130 }}
					>
						<Option value="all">All Priorities</Option>
						<Option value="low">Low</Option>
						<Option value="medium">Medium</Option>
						<Option value="high">High</Option>
					</Select>
					<Select
						value={sort}
						onChange={(val) =>
							setSearchParams({
								completed,
								page: "1",
								priority,
								sort: val,
								search,
							})
						}
						style={{ width: 180 }}
					>
						<Option value="createdAt-desc">Created: Newest</Option>
						<Option value="createdAt-asc">Created: Oldest</Option>
						<Option value="dueDate-asc">Due Soon</Option>
						<Option value="dueDate-desc">Due Last</Option>
					</Select>
					<input
						placeholder="Search tasks"
						className="border px-2 py-1 rounded"
						style={{ width: 200 }}
						defaultValue={search}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const value = (e.target as HTMLInputElement).value;
								setSearchParams({
									completed: "all",
									priority: "all",
									sort: "createdAt-desc",
									search: value,
								});
							}
						}}
					/>
					<Button type="primary" onClick={() => navigate("/tasks/create")}>
						Create Task
					</Button>
				</div>
			</div>
			<Table
				dataSource={tasks}
				columns={columns}
				loading={loading}
				pagination={{
					current: page,
					pageSize: pageSize,
					onChange: handlePaginationChange,
					total: total,
					showSizeChanger: true,
					pageSizeOptions: ["5", "10", "20", "50"],
				}}
			/>
		</div>
	);
}
