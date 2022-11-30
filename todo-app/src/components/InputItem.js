import React, { useState } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";

export const InputBlock = ({ value, name, keyHandler, listCreate }) => {
	const [isValue, setIsValue] = useState(value ? true : false);
	const [val, setVal] = useState(value);

	return (
		<label className="modal__label">
			{isValue ? (
				<div className="modal__title-control">
					<h2 className="modal__title">{value}</h2>

					<button
						className="modal__title-btn"
						onClick={(e) => {
							setIsValue(!isValue);
						}}
					>
						<AiFillEdit color="#97969B" size={20} />
					</button>
					{listCreate && (
						<button
							className="modal__title-btn"
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							<AiOutlinePlus
								color="#97969B"
								size={20}
								onClick={(e) => {
									e.preventDefault();
									listCreate(true);
								}}
							/>
						</button>
					)}
				</div>
			) : (
				<div className="modal__title-control">
					<input
						type="text"
						className="modal__input"
						autoFocus={true}
						name={name}
						value={val}
						onChange={(e) => {
							setVal(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								keyHandler(name, val);
								setIsValue(!isValue);
							}
						}}
					/>
					<button
						className="modal__btn"
						onClick={(e) => {
							e.preventDefault();
							keyHandler(name, val);
							setIsValue(!isValue);
						}}
					>
						Ok
					</button>
				</div>
			)}
		</label>
	);
};
