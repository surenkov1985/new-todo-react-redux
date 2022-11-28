import React from "react";
import { useLocation } from "react-router-dom";

export default function Project(props) {
	const location = useLocation();
	const project = location.state.from;

	console.log(project);

	return (
		<div className="todo__main">
			<div className="todo__container">
				<div className="todo__create">{/* <Create createHandler={setState} createText="Добавить колонку" name="state" /> */}</div>
				{/* {modalActive && <AddCard obj={obj} closeModal={closeModal} states={states} />} */}
			</div>
		</div>
	);
}
