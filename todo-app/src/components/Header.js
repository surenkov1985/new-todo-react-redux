import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProject } from "../redux/projects/actions";
import { themeToggle } from "../redux/theme/actions";
import Button from "./Button";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export const Header = () => {
	const sunBtn = <BsFillSunFill size={26} color="#FFF" />;
	const moonBtn = <BsFillMoonFill size={26} color="#FFF" />;
	const { theme } = useSelector((state) => state.themeReducer);
	const { selectedProject } = useSelector((state) => state.projectsReducer);
	const dispatch = useDispatch();

	//  Обработчик кнопки переключения темы

	function buttonHandler() {
		dispatch(themeToggle());
	}

	// При изменении темы передаем новое значение в localStorage

	useEffect(() => {
		localStorage.setItem("todo-theme", theme);
	}, [theme]);

	// Обработчик ссылки выхода к выбору проектов. Удаляет выбранный проект из State и из localStorage

	const linkHandler = () => {
		dispatch(selectProject(null));
		localStorage.removeItem("selected-project");
	};

	return (
		<div className="header">
			<div className="header__title">
				<h1>TODO</h1>
			</div>
			<div className="header__control">
				{selectedProject && (
					<Link
						className={"header__link"}
						to="select_project"
						onClick={(e) => {
							linkHandler();
						}}
					>
						Return to projects
					</Link>
				)}
				<Button
					classList={["header__theme-btn"]}
					onClick={() => {
						buttonHandler();
					}}
				>{theme === "dark" ? sunBtn : moonBtn}</Button>
			</div>
		</div>
	);
}
