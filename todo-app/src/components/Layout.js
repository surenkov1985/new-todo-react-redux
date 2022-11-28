import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectProject } from "../redux/projects/actions";
import { SELECT_PROJECT } from "../redux/projects/types";
import Header from "./Header";
// import { Context } from "../..";

export const Layout = () => {
	const { projects, selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});

	const dispatch = useDispatch();

	const projectSelected = (title) => {
		dispatch(selectProject(SELECT_PROJECT, title));
	};
	// const { auth } = useContext(Context);
	// const navigate = useNavigate();

	// const [user] = useAuthState(auth);

	// useEffect(() => {
	// 	if (user) {
	// 		navigate("content");
	// 	} else {
	// 		navigate("login");
	// 	}
	// }, [user]);

	return (
		<div className="container">
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
						<button>+</button>
					</>
				)}

				<Outlet />
			</div>
		</div>
	);
};
