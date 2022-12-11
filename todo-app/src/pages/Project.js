import React, { useEffect, useState } from "react";
import { Create } from "../components/Create";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, addTask, removeTask, updateProjects } from "../redux/projects/actions";
import { AddCard } from "../components/AddCard";
import { TodoCard } from "../components/TodoCard";
import { Task } from "../models";

export default function Project() {
	const { selectedProject } = useSelector((state) => state.projectsReducer);
	const dispatch = useDispatch();
	const [modalActive, setModalActive] = useState(false);
	const [task, setTask] = useState(null);

	// Добавление колонки-статуса

	const setState = (text, state) => {
		dispatch(addStatus({ text: text }));
	};

	// Закрытие модального окна

	const closeModal = () => {
		setModalActive(false);
		setTask(null);
	};

	// Добавление новой задачи

	const createTask = (value, state) => {
		const data = new Task(value, state, selectedProject.taskCounter + 1, selectedProject.priorities[0]);
		dispatch(addTask(data));
	};

	const modalOpen = () => {
		setModalActive(true);
	};

	// Обработка клика по задаче (выбирается задача, открывается модальное окно с данными выбранной задачи)

	const cardClickHandler = (data) => {
		setTask(data);
		modalOpen();
	};

	// Удаление задачи

	const deleteTask = (event, id) => {
		event.preventDefault();
		event.stopPropagation();
		dispatch(removeTask(id));
	};

	// Обновление списка проектов в State при изменении выбранного проекта

	useEffect(() => {
		if (selectedProject) dispatch(updateProjects(selectedProject));
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
