import React, { useEffect, useState } from "react";
import { Create } from "../components/Create";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, addTask, removeTask, selectProject } from "../redux/projects/actions";
import { AddCard } from "../components/AddCard";
import { TodoCard } from "../components/TodoCard";

export default function Project() {
	const { projects, selectedProject } = useSelector((state) => state.projectsReducer);
	const dispatch = useDispatch();
	const [modalActive, setModalActive] = useState(false);
	const [task, setTask] = useState(null);

	const setState = (text, id, state) => {
		selectedProject.statuses.push(text);
		dispatch(addStatus(selectedProject));
		dispatch(selectProject(selectedProject));
	};

	const closeModal = () => {
		setModalActive(false);
		setTask(null);
	};

	const createTask = (value, id, state) => {
		const data = { title: value, id: selectedProject.tasks.length + 1, status: state };
		dispatch(addTask(data));
	};

	const modalOpen = () => {
		setModalActive(true);
	};

	const cardClickHandler = (data) => {
		setTask(data);
		modalOpen();
	};

	const deleteTask = (event, id) => {
		event.preventDefault()
		event.stopPropagation()
		dispatch(removeTask(id))
	}

	useEffect(() => {
		localStorage.setItem("todo-projects", JSON.stringify(projects));
		localStorage.setItem("selected-project", JSON.stringify(selectedProject));
	}, [projects]);

	useEffect(() => {
		dispatch(addStatus(selectedProject));
	}, [selectedProject]);

	return (
		<div className="todo__main">
			<h1 className="todo__title">{selectedProject?.title}</h1>
			<div className="todo__container">
				{selectedProject &&
					selectedProject.statuses?.map((status) => {
						return (
							<div key={status} className="todo__create status">
								<h2 className="status__title">{status}</h2>
								{selectedProject.tasks
									.filter((item) => item.status === status)
									.map((task) => {
										return (
											<TodoCard key={task.id} data={task} id={task.id} cardClick={cardClickHandler} deleteCard={deleteTask} />
											// <div key={task.id} onClick={(e) => cardClickHandler(task)}>
											// 	{task.title}
											// </div>
										);
									})}
								<Create createHandler={createTask} createText="Add a task" name="title" state={status} />
							</div>
						);
					})}

				<div className="todo__create status">
					<Create createHandler={setState} createText="Add a column" name="status" />
				</div>
			</div>
			{modalActive && <AddCard closeModal={closeModal} obj={task} />}
			{/* </div> */}
		</div>
	);
}
