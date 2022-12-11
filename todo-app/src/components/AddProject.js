import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import Button from "./Button";

export const AddProject = ({ closeModal, addProject }) => {
	const [val, setVal] = useState("");

	return (
		<div className="modal">
			<div className="modal__container">
				<h2 className="modal__title">Add a project</h2>
				<div className="modal__form-container">
					<div className="modal__form">
						<label className="modal__label-checkname">
							<input
								type="text"
								className="modal__input"
								autoFocus={true}
								name="title"
								value={val}
								placeholder="Enter project name..."
								onChange={(e) => {
									setVal(e.target.value);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										addProject(val);
									}
								}}
							/>
						</label>
						<button
							className="modal__btn"
							onClick={() => {
								addProject(val);
							}}
						>
							Add
						</button>
					</div>
				</div>
				<Button classList={["modal__close"]} onClick={closeModal}>
					<GrClose size={20} color="#ff0000" />
				</Button>
			</div>
		</div>
	);
};
