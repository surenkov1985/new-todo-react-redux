import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectProject } from "../redux/projects/actions";
import { SELECT_PROJECT } from "../redux/projects/types";
import Header from "./Header";
import classNames from "classnames"

export const Layout = () => {
	const { projects, selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});
	const {theme} = useSelector(state => state.themeReducer)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.hasOwnProperty("selected-project")) {
			dispatch(selectProject(SELECT_PROJECT, JSON.parse(localStorage.getItem("selected-project"))));
			navigate("project");
		}
	}, []);

	const projectSelected = (obj) => {
		localStorage.setItem("selected-project", JSON.stringify(obj));
		dispatch(selectProject(SELECT_PROJECT, obj));
	};

	return (
		<div className={classNames("container", theme)}>
			<div className="background" />
			<Header project={selectedProject} />
			<div className="container__todo todo">
				{!selectedProject && (
					<>
						{projects.map((item) => {
							return (
								<Link
									key={item.id}
									to={"project"}
									state={{ from: item }}
									onClick={(e) => {
										projectSelected(item);
									}}
								>
									{item.title}
								</Link>
							);
						})}
						<button>+ Create new project</button>
					</>
				)}

				<Outlet />
			</div>
		</div>
	);
};
