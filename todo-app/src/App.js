import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
import { setProjects } from "./redux/projects/actions";

function App() {
	const dispatch = useDispatch();

	const { projects } = useSelector((state) => {
		return state.projectsReducer;
	});

	useEffect(() => {
		if (localStorage.hasOwnProperty("todo-projects")) {
			dispatch(setProjects(JSON.parse(localStorage.getItem("todo-projects"))));
		} else {
			localStorage.setItem("todo-projects", JSON.stringify(projects));
		}

	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="project" element={<Project />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
