import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {Header} from "./Header";
import classNames from "classnames";
import { useSelector } from "react-redux";

export const Layout = () => {
	const { selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});
	const { theme } = useSelector((state) => state.themeReducer);
	const navigate = useNavigate();

	// При перезагрузке проверяем был ли выбран проект. Если выбран перенаправляем на страницу проекта, иначе на страницу выбора проекта

	useEffect(() => {
		if (selectedProject) {
			navigate("project");
		} else navigate("select_project");
	}, []);

	return (
			<div className={classNames("container", theme)}>
			<div className="background" />
			<Header project={selectedProject} />
			<Outlet />
		</div>
		
	);
};
