import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import uniqid from "uniqid";

export const AddCard = ({ closeModal, addProject }) => {
	const [val, setVal] = useState("");
	const id = uniqid();

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
										if (val) {
											addProject(val, id);
										}
									}
								}}
							/>
						</label>
						<button
							className="modal__btn"
							onClick={() => {
								if (val) {
									addProject(val, id);
								}
							}}
						>
							Add
						</button>
					</div>
				</div>
				<button className="modal__close" onClick={(e) => closeModal()}>
					<GrClose size={20} color="#ff0000" />
				</button>
			</div>
		</div>
	);
};
