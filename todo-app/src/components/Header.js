import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectProject } from "../redux/projects/actions";
import { themeToggle } from "../redux/theme/actions";
import Button from "./Button";

function Header(props) {
	function buttonHandler() {
		document.body.classList.toggle("dark");
	}

	const dispatch = useDispatch();

	const linkHandler = () => {
		dispatch(selectProject(null));
	};

	return (
		<div className="todo__head">
			<div className="todo__title">
				<h1>TODO</h1>
			</div>
			<div className="todo__head-control">
				{props.project && (
					<Link
						className={"todo__header-link"}
						to=""
						onClick={(e) => {
							linkHandler();
						}}
					>
						Return to projects
					</Link>
				)}
				<Button
					classList={["todo__theme-btn"]}
					text={props.icon}
					onClick={() => {
						props.onThemeToggle();
						buttonHandler();
					}}
				/>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	const { themeReducer } = state;
	return {
		icon: themeReducer.icon,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onThemeToggle: () => dispatch(themeToggle()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
