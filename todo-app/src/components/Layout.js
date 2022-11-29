import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { addProject, selectProject } from "../redux/projects/actions";
import Header from "./Header";
import classNames from "classnames";

export const Layout = () => {
	const { projects, selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});
	const { theme } = useSelector((state) => state.themeReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (selectedProject) {
			navigate("project");
		} else navigate("select_project");
	}, []);

	useEffect(() => {
		if (location.pathname !== "/project") {
			dispatch(selectProject(null));
			localStorage.removeItem("selected-project");
		}
	}, [location.pathname]);

	return (
		<div className={classNames("container", theme)}>
			<div className="background" />
			<Header project={selectedProject} />
			<Outlet />
			{/* <div className="container__todo todo">
				{!selectedProject && (
					<div className="todo__main">
						<div className="todo__container">
							{projects.map((item) => {
								return (
									<div className="todo__project-link" key={item.id}>
										<Link
											to={"project"}
											className="todo__link"
											onClick={(e) => {
												projectSelected(item);
											}}
										>
											{item.title}
										</Link>
									</div>
								);
							})}
							<div className="todo__project-link">
								<button
									className="todo__link"
									onClick={(e) => {
										setModalActive(true);
									}}
								>
									+ Add
								</button>
							</div>
						</div>
					</div>
				)}

				<Outlet />
				{modalActive && <AddCard closeModal={closeModal} addProject={createProject} />}
			</div> */}
		</div>
	);
};
