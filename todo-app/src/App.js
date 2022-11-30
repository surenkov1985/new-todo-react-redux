import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import { SelectProject } from "./pages/SelectProject";
import { setProjects } from "./redux/projects/actions";

function App() {
	const dispatch = useDispatch();

	const { projects } = useSelector((state) => {
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

	useEffect(() => {
			localStorage.setItem("todo-projects", JSON.stringify(projects));
	}, [projects]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="select_project" element={<SelectProject/>}/>
					<Route path="project" element={<Project />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
