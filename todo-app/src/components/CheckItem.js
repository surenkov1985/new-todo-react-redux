import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

export const ClickItem = ({ checked, checkHandler, text, removeHandler, id }) => {
	const [val, setVal] = useState(text);
	const [check, setCheck] = useState(checked);

	return (
		<div className="modal__list">
			<label className="todo__create-container">
				<input
					type="checkbox"
					className="todo__check"
					checked={check}
					onChange={(e) => {
						setCheck(!check);
						checkHandler(id);
						console.log(222);
					}}
				/>
				<div className="todo__false-check">
					<BsCheck size={15} color="#FFFFFF" strokeWidth={1} />
				</div>
				<input
					className="todo__text"
					type="text"
					name=""
					value={val}
					onChange={(e) => {
						setVal(e.target.value);
						console.log(111);
					}}
				/>
				<button
					className="modal__delete-btn"
					onClick={(e) => {
						removeHandler(id);
					}}
				>
					<GrClose size={18} color="#ff0000" />
				</button>
			</label>
		</div>
	);
};
