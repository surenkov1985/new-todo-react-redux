import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Button from "./Button";

export const Create = ({ createText, createHandler, name, state }) => {
	const [isCreateCard, setIsCreateCard] = useState(false);
	const [val, setVal] = useState("");

	function onKeyPress(e) {
		if (e.key === "Enter" && val) {
			e.preventDefault();
			return formSubmit(e);
		}
	}

	const formSubmit = (e) => {
		e.preventDefault();
		setIsCreateCard(false);
		setVal("");
		createHandler(val, state);
	};

	const cancelButtonHandler = () => {
		setIsCreateCard(false)
	}

	return (
		<form className="todo__create-form" onSubmit={(e) => formSubmit(e)}>
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
						<div className="todo__create-control">
							<Button classList={["todo__form-btn"]} onClick={formSubmit}>
								Add
							</Button>
							<Button classList={["todo__form-btn"]} onClick={cancelButtonHandler}>
								Cancel
							</Button>
						</div>
					</label>
				)}
			</div>
		</form>
	);
};
