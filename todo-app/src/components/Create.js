import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import uniqid from "uniqid"


export const Create = ({ createText, createHandler, name, state }) => {
	const [isCreateCard, setIsCreateCard] = useState(false);
	const [val, setVal] = useState("");
	const id = uniqid()

	function onKeyPress(e) {
		if (e.key === "Enter" && val) {
			e.preventDefault();
			return formSubmit(e);
		}
	}

	const formSubmit = (e) => {
		e.preventDefault()
		setIsCreateCard(false);
		setVal("");
		createHandler(val, id, state);
	};

	return (
		<form className="todo__create-form" onSubmit={e => formSubmit(e)}>
			<div className="todo__create-container">
				{!isCreateCard ? (
					<div
						className="todo__form-btn"
						onClick={() => {
							setIsCreateCard(true);
							setVal("");
						}}
					>
						<span>
							<HiPlus />
						</span>
						<span>{createText}</span>
					</div>
				) : (
					<label className="todo__create-label">
						<textarea
							autoFocus
							className="todo__input"
							placeholder="Введите название"
							rows="2"
							name={name}
							value={val}
							onChange={(e) => {
									setVal(e.target.value);
								}}
							onKeyPress={(e) => onKeyPress(e)}
						/>
						<button
							className="todo__form-btn"
							onClick={(e) => {
								e.preventDefault();
								setIsCreateCard(false);
							}}
						>
							Создать
						</button>
					</label>
				)}
			</div>
		</form>
	);
}
