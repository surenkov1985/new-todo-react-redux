import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProject } from "../redux/projects/actions";
import { themeToggle } from "../redux/theme/actions";
import Button from "./Button";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function Header(props) {
	const sunBtn = <BsFillSunFill size={26} color="#FFF" />;
	const moonBtn = <BsFillMoonFill size={26} color="#FFF" />;
	const { theme } = useSelector((state) => state.themeReducer);
	const { selectedProject } = useSelector((state) => state.projectsReducer);
	const dispatch = useDispatch();

	function buttonHandler() {
		dispatch(themeToggle());
	}

	console.log(selectedProject);

	useEffect(() => {
		localStorage.setItem("todo-theme", theme);
	}, [theme]);

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
					text={theme === "dark" ? sunBtn : moonBtn}
					onClick={() => {
						buttonHandler();
					}}
				/>
			</div>
		</div>
	);
}

export default Header;
