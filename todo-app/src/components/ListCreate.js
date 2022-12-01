import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

export const ListCreate = ({ pushListHandler, listCreate, focus, name }) => {
	const [val, setVal] = useState("");

	return (
		<label className="todo__create-container">
			<input
				type="text"
				className="todo__input"
				placeholder="Enter text"
				value={val}
				name={name}
				onChange={(e) => {
					setVal(e.target.value);
				}}
				autoFocus={focus}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						pushListHandler(name, val);
						setVal("");
					}
				}}
			/>
			<button
				className="modal__title-btn"
				onClick={(e) => {
					e.preventDefault();
					pushListHandler(name, val);
					setVal("");
				}}
			>
				<AiOutlinePlus color="#97969B" size={20} />
			</button>
			{listCreate && <button
				className="modal__title-btn"
				onClick={(e) => {
					e.preventDefault();
					listCreate(false);
				}}
			>
				<GrClose color="#97969B" size={20} />
			</button>}
		</label>
	);
};
