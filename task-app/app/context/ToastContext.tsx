import { Alert } from "antd";
import { type ReactNode, createContext, useContext, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

type ToastContextProps = {
	toasts: Toast[];
	showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = (message: string, type: ToastType = "info") => {
		const id = ++idCounter;
		setToasts((prev) => [...prev, { id, message, type }]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 3000);
	};

	const handleClose = (id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ toasts, showToast }}>
			{children}
			<div className="fixed bottom-7 left-1/2 -translate-x-1/2 space-y-2 z-50 min-w-[250px]">
				{toasts.map((toast) => (
					<Alert
						key={toast.id}
						message={toast.message}
						type={toast.type}
						closable
						onClose={() => handleClose(toast.id)}
						style={{ marginBottom: 8 }}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error("useToast must be used within ToastProvider");
	return context;
};
