import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { checkedList, removeItem } from "../redux/projects/actions";
import { updateTask } from "../redux/projects/actions";
import { InputBlock } from "./InputItem";
import { TextInput } from "./TextItem";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { SelectBlock } from "./SelectBlock";
import { DateInput } from "./DateInput";
import { ListCreate } from "./ListCreate";
import { FileInput } from "./FileItem";
import { ClickItem } from "./CheckItem";
import { fileRead } from "../js/functions";
import { Comments } from "./Comments";
import { CheckItem, Comment } from "../models";
import Button from "./Button";

export const AddCard = ({ obj, closeModal, statuses, priorities }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.projectsReducer);
	const task = useSelector((state) => {
		const { projectsReducer } = state;
		return projectsReducer.selectedProject.tasks.find((task) => task.id === obj.id);
	});

	const setTimeString = () => {
		let time = Math.floor((dayjs().valueOf() - task.date) / 1000);
		let day = Math.floor(time / (24 * 60 * 60)) ? `${Math.floor(time / (24 * 60 * 60))} day ` : "";
		let hour = Math.floor((time % (24 * 60 * 60)) / (60 * 60)) ? `${Math.floor((time % (24 * 60 * 60)) / (60 * 60))} hour ` : "";
		let min = Math.floor(((time % (24 * 60 * 60)) % (60 * 60)) / 60) ? `${Math.floor(((time % (24 * 60 * 60)) % (60 * 60)) / 60)} min` : "";

		return day + hour + min;
	};

	const [pushData, setPushData] = useState(null);
	const [error, setError] = useState("");
	const [isCreate, setIsCreate] = useState(false);
	const [checkNameCreate, setCheckNameCreate] = useState(task.checkListName ? true : false);
	const [leadTime, setLeadTime] = useState(setTimeString);
	let leadTimeInterval;

	

	useEffect(() => {
		leadTimeInterval = setInterval(() => {
			setLeadTime(setTimeString);
		}, 300 * 1000);
	}, []);

	const CloseModalHandler = () => {
		closeModal();
		clearInterval(leadTimeInterval);
		setLeadTime("");
	};

	// Функция добавления древовидных комментариев

	const arriterator = (arr, obj, val) => {
		if (arr && arr.length !== 0) {
			return arr.map((item) => {
				if (arr.find((res) => res.id === obj.id)) {
					if (item.id === obj.id) {
						return { ...item, subComments: [...obj.subComments, val] };
					}
					return item;
				} else {
					return { ...item, subComments: arriterator(item.subComments, obj, val) };
				}
			});
		}

		return arr;
	};

	// Добавление задачи с чек-лист

	const pushList = (name, value) => {
		let pushList = new CheckItem(value);

		if (!task.checkList) {
			pushTodo(name, [pushList]);
		} else {
			pushTodo(name, [...task.checkList, pushList]);
		}
	};

	// Добавление комментария

	const pushComments = (name, value) => {
		const comment = new Comment(user.userName, value);
		if (!task.comments) {
			pushTodo(name, [comment]);
		} else {
			pushTodo(name, [...task.comments, comment]);
		}
	};

	// Добавление ответа на комментарий
	const pushSubComments = (comment, subcomment) => {
		const subComment = new Comment(user.userName, subcomment);

		pushTodo("comments", arriterator(task.comments, comment, subComment));
	};

	// Выделение пункта чек-листа как выполненного/невыполненного

	const checkedHandler = (id) => {
		dispatch(checkedList(obj.id, id));
	};

	// Удаление пункта списка чек-листа

	const removeList = (id) => {
		dispatch(removeItem(obj.id, id));
	};

	// Создание обьекта с новыми данными дл обновления пунктов задачи

	const pushTodo = (name, value) => {
		let pushData = {};
		pushData[name] = value ? value : "";

		setPushData(pushData);
	};

	// Обновление задачи

	useEffect(() => {
		if (pushData) {
			dispatch(updateTask({ id: task.id, obj: pushData }));
		}
	}, [pushData]);

	const checkListNameHandler = () => {
		setCheckNameCreate(true);
	};

	return (
		<div
			className="modal"
			onClick={(e) => {
				if (e.target.classList.contains("modal")) CloseModalHandler();
			}}
		>
			<div
				className="modal__container"
				onDrop={(e) => {
					e.preventDefault();
					fileRead(e.dataTransfer.files[0], setError, setPushData);
				}}
			>
				<div className="modal__form-container">
					{task && (
						<div className="modal__form">
							<span className="modal__numb">Task № {task.numb + ", " + dayjs(task.date).locale("en").format("YYYY MMM DD HH:mm")}</span>

							<InputBlock value={task.title} name="title" keyHandler={pushTodo} />

							<SelectBlock state={task.status.text} states={statuses} clickHandler={pushTodo} title="Status" name="status" />

							<SelectBlock state={task.priority.text} states={priorities} clickHandler={pushTodo} title="Priority" name="priority" />

							<div className="modal__title-control">
								<span>Lead time</span>
								<span>{leadTime}</span>
							</div>

							<TextInput text={task.description} name="description" keyHandler={pushTodo} title="Description" />

							<DateInput timestamp={task.endDate} clickHandler={pushTodo} title="Date of completion" />
							<h3 className="modal__label-title">Attachment</h3>
							<FileInput value={task.file} name="file" checkHandler={setPushData} type={task.fileType} setErr={setError} />

							{checkNameCreate ? (
								<label className="modal__label">
									<InputBlock
										value={task.checkListName}
										name="checkListName"
										defaultValue="Check-list"
										keyHandler={pushTodo}
										listCreate={setIsCreate}
									/>
									{isCreate && <ListCreate listCreate={setIsCreate} pushListHandler={pushList} focus={true} name="checkList" />}
								</label>
							) : (
								<Button classList={["modal__btn"]} onClick={checkListNameHandler}>
									Add check-list
								</Button>
							)}

							<div className="modal__label">
								{task.checkList &&
									task.checkList.map((check) => {
										return (
											<ClickItem
												key={check.id}
												id={check.id}
												checked={check.checked}
												text={check.text}
												checkHandler={checkedHandler}
												removeHandler={removeList}
											/>
										);
									})}
							</div>
							<div className="modal__label">
								<h3 className="modal__label-title">Comments</h3>

								<ListCreate focus={false} pushListHandler={pushComments} name="comments" />
								{task.comments && <Comments comments={task.comments} pushComments={pushSubComments} />}
							</div>
						</div>
					)}
				</div>
				{error && <div className="modal__error">{error}</div>}
				<Button classList={["modal__close"]} onClick={CloseModalHandler}>
					<GrClose size={20} color="#ff0000" />
				</Button>
			</div>
		</div>
	);
};
