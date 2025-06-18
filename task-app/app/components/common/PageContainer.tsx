export default function PageContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
	);
}
