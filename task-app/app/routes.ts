import {
	type RouteConfig,
	index,
	layout,
	prefix,
	route,
} from "@react-router/dev/routes";

export default [
	index("./pages/home.tsx"),
	layout("./components/common/LayoutBoxed.tsx", [
		route("login", "./pages/auth/LoginPage.tsx"),
		route("register", "./pages/auth/RegisterPage.tsx"),
	]),
	layout("./components/common/Layout.tsx", [
		...prefix("tasks", [
			route("dashboard", "./pages/task/TaskPage.tsx"),
			route("create", "./pages/task/CreateTaskPage.tsx"),
			route("edit/:id", "./pages/task/EditTaskPage.tsx"),
			route("view/:id", "./pages/task/ViewTaskPage.tsx"),
		]),
	]),
] satisfies RouteConfig;
