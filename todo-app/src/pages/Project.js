import React, { useEffect, useState } from "react";
import { Create } from "../components/Create";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, addTask, removeTask, selectProject } from "../redux/projects/actions";
import { AddCard } from "../components/AddCard";
import { TodoCard } from "../components/TodoCard";
import dayjs from "dayjs";

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
		const data = {
			title: value,
			id: id,
			status: state,
			numb: selectedProject.taskCounter + 1,
			date: dayjs().valueOf(),
			priority: selectedProject.priorities[0],
		};
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
		event.preventDefault();
		event.stopPropagation();
		dispatch(removeTask(id));
	};

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
							<div key={status.text} className="todo__create status">
								<h2 className="status__title">{status.text}</h2>
								{selectedProject.tasks
									.filter((item) => item.status.text === status.text)
									.sort((a, b) => a.priority.val - b.priority.val)
									.map((task) => {
										return (
											<TodoCard key={task.id} data={task} id={task.id} cardClick={cardClickHandler} deleteCard={deleteTask} />
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
			{modalActive && (
				<AddCard closeModal={closeModal} obj={task} statuses={selectedProject.statuses} priorities={selectedProject.priorities} />
			)}
		</div>
	);
}
