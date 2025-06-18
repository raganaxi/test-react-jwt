import dayjs from "dayjs";
import React from "react";

interface DueDateProps {
	dueDate?: Date; // ISO string
}

export default function DueDate({ dueDate }: DueDateProps) {
	const now = dayjs().startOf('day');
	const due = dayjs(dueDate).startOf('day');
	const isPast = due.isBefore(now, "day");
	const daysLeft = due.diff(now, "day");

	if (daysLeft === 0) {
		return <div className="text-sm text-yellow-500">Due today</div>;
	}

	return (
		<div className={`text-sm ${isPast ? "text-red-500" : "text-green-500"}`}>
			{isPast ? (
				<span>Due {Math.abs(daysLeft)} days ago</span>
			) : (
				<span>Due in {daysLeft} days</span>
			)}
		</div>
	);
}
export type { DueDateProps };
