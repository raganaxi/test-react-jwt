
interface completedTaskProps {
  completed?: boolean; // ISO string
}
export default function  CompletedTask({
  completed,
}: completedTaskProps) {
  return (
    <div
      className={`text-sm ${
        completed ? "text-green-500" : "text-red-500"
      } font-semibold`}
    >
      {completed ? "Completed" : "Not Completed"}
    </div>
  );
}