import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import { SelectProject } from "./pages/SelectProject";

function App() {
	const { projects, selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});

	useEffect(() => {
		document.addEventListener("dragover", (e) => {
			e.preventDefault();
		});
		document.body.addEventListener("drop", (e) => {
			e.preventDefault();
		});
	}, []);

	// При изменении проектов (добавление/удаление) обновляем значение в localStorage
	useEffect(() => {
		if (projects) localStorage.setItem("todo-projects", JSON.stringify(projects));
	}, [projects]);

	// При изменении выбранного проекта и внесении изменений в выбранном проекте обновляем значение в localStorage

	useEffect(() => {
		if (selectedProject) {
			localStorage.setItem("selected-project", JSON.stringify(selectedProject));
		}
	}, [selectedProject]);

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="select_project" element={<SelectProject />} />
					<Route path="project" element={<Project />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
