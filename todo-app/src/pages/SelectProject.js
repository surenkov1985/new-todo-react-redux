import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProject, selectProject } from "../redux/projects/actions";
import { AddProject } from "../components/AddProject";

export const SelectProject = () => {
    const dispatch = useDispatch();
	const { projects } = useSelector((state) => {
		return state.projectsReducer;
	});
	
	const [modalActive, setModalActive] = useState(false);

	const closeModal = () => {
		setModalActive(false);
	};

    // Создание нового проекта

	const createProject = (title) => {
		if (title) {
			dispatch(addProject(title));
			closeModal();
		}
	};

    // Выбор проекта
    
	const projectSelected = (obj) => {
		dispatch(selectProject(obj));
	};

	return (
		<div className="container__todo todo">
			<div className="todo__main">
				<div className="todo__container">
					{projects.map((item) => {
						return (
							<div className="todo__project-link" key={item.id}>
								<Link
									to={"../project"}
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

			{modalActive && <AddProject closeModal={closeModal} addProject={createProject} />}
		</div>
	);
};
