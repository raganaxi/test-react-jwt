import type { TaskFormValues } from "@/types/task";
import { Button, DatePicker, Form, Input, Radio, Switch } from "antd";
import UserSelect from "~/components/common/UserSelect";

type Props = {
	initialValues?: Partial<TaskFormValues>;
	onFinish: (values: TaskFormValues) => void;
	isSubmitting?: boolean;
};

export default function TaskForm({
	initialValues,
	onFinish,
	isSubmitting,
}: Props) {
	const options = [
		{ label: "Low", value: "low" },
		{ label: "Medium", value: "medium" },
		{ label: "High", value: "high" },
	];

	return (
		<Form
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
			className="space-y-4 md:grid md:grid-cols-2 md:gap-4"
		>
			<Form.Item
				name="title"
				label="Title"
				rules={[{ required: true, message: "Please enter a title" }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="description"
				label="Description"
				className="md:col-span-2"
			>
				<Input.TextArea rows={4} />
			</Form.Item>

			<Form.Item name="completed" label="Completed" valuePropName="checked">
				<Switch />
			</Form.Item>

			<Form.Item
				name="priority"
				label="Priority"
				rules={[{ required: true, message: "Please select a priority" }]}
			>
				<Radio.Group options={options} optionType="button" />
			</Form.Item>

			<Form.Item
				name="dueDate"
				label="Due Date"
				rules={[{ required: true, message: "Please select a due date" }]}
			>
				<DatePicker className="w-full" />
			</Form.Item>

			<Form.Item
				name="userId"
				label="Assign User"
				rules={[{ required: true, message: "Please select a user" }]}
			>
				<UserSelect onChange={(value) => {}} value={initialValues?.userId} />
			</Form.Item>

			<Form.Item className="md:col-span-2">
				<Button
					htmlType="submit"
					type="primary"
					loading={isSubmitting}
					className="w-full md:w-auto"
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
