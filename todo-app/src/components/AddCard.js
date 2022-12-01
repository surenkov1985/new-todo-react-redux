import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { checkedList, removeItem } from "../redux/projects/actions";
import uniqid from "uniqid";
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
import { Comment } from "../models";

export const AddCard = ({ obj, closeModal, statuses, priorities }) => {
	const task = useSelector((state) => {
		const { projectsReducer } = state;
		return projectsReducer.selectedProject.tasks.find((task) => task.id === obj.id);
	});
	const [todo, setTodo] = useState(task);
	const [checkList, setCheckList] = useState(todo.checkList);
	const [commentList, setCommentList] = useState(todo.comments);
	const [pushData, setPushData] = useState(null);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const [isCreate, setIsCreate] = useState(false);
	const [checkNameCreate, setCheckNameCreate] = useState(todo.checkListName ? true : false);

	useEffect(() => {
		if (task) {
			setTodo(task);
			setCheckList(task.checkList);
			setCommentList(task.comments);
		}
	}, [task]);

	const pushList = (name, value) => {
		let pushList = { id: uniqid(), checked: false, completed: "", text: value };

		if (!checkList) {
			pushTodo(name, [pushList]);
		} else {
			pushTodo(name, [...checkList, pushList]);
		}
	};
	const pushComments = (name, value) => {
		const comment = new Comment("User", value);
		if (!commentList) {
			pushTodo(name, [comment]);
		} else {
			pushTodo(name, [...commentList, comment]);
		}
	};
	const pushSubComments = (comment, subcomment) => {
		const subComment = new Comment("qqq", subcomment);

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

		pushTodo(
			"comments",
			arriterator(commentList, comment, subComment)
		);
	};
	const checkedHandler = (id) => {
		dispatch(checkedList(obj.id, id));
	};

	const removeList = (id) => {
		dispatch(removeItem(obj.id, id));
	};

	const pushTodo = (name, value) => {
		let pushData = {};
		pushData[name] = value ? value : "";

		setPushData(pushData);
	};
	useEffect(() => {
		if (pushData) {
			dispatch(updateTask({ ...todo, ...pushData }));
			setCheckList(pushData.checkList);
		}
	}, [pushData]);

	return (
		<div className="modal">
			<div
				className="modal__container"
				onDrop={(e) => {
					e.preventDefault();
					fileRead(e.dataTransfer.files[0], setError, setPushData);
				}}
			>
				<div className="modal__form-container">
					{todo && (
						<div className="modal__form">
							<span className="modal__numb">Task № {todo.numb + ", " + dayjs(todo.date).locale("en").format("YYYY MMM DD HH:mm")}</span>

							<InputBlock value={todo.title} name="title" keyHandler={pushTodo} />

							<SelectBlock state={todo.status.text} states={statuses} clickHandler={pushTodo} title="Status" name="status" />

							<SelectBlock state={todo.priority.text} states={priorities} clickHandler={pushTodo} title="Priority" name="priority" />

							<TextInput text={todo.description} name="description" keyHandler={pushTodo} title="Description" />

							<DateInput timestamp={todo.endDate} clickHandler={pushTodo} title="Date of completion" />
							<h3 className="modal__label-title">Attachment</h3>
							<FileInput value={todo.file} name="file" checkHandler={setPushData} type={todo.fileType} setErr={setError} />

							{checkNameCreate ? (
								<label className="modal__label">
									<InputBlock
										value={todo.checkListName}
										name="checkListName"
										defaultValue="Check-list"
										keyHandler={pushTodo}
										listCreate={setIsCreate}
									/>
									{isCreate && <ListCreate listCreate={setIsCreate} pushListHandler={pushList} focus={true} name="checkList" />}
								</label>
							) : (
								<button
									className="modal__btn"
									onClick={(e) => {
										setCheckNameCreate(true);
									}}
								>
									Add check-list
								</button>
							)}

							<div className="modal__label">
								{todo.checkList &&
									todo.checkList.map((check) => {
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
								{commentList && <Comments comments={commentList} pushComments={pushSubComments} />}
							</div>
						</div>
					)}
				</div>
				{error && <div className="modal__error">{error}</div>}
				<button className="modal__close" onClick={(e) => closeModal()}>
					<GrClose size={20} color="#ff0000" />
				</button>
			</div>
		</div>
	);
};
