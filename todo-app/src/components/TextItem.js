import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

export const TextInput = ({ title, name, keyHandler, text }) => {
	const [val, setVal] = useState(text);
	const [isValue, setIsValue] = useState(true);
	const textRef = useRef(null);

	useEffect(() => {
		if (textRef.current) {
			textRef.current.selectionStart = val?.length;
		}
	}, [isValue]);

	return (
		<label className="modal__label">
			<div className="modal__title-control">
				<h3 className="modal__label-title">{title}</h3>
				<button
					className="modal__title-btn"
					onClick={() => {
						setIsValue(!isValue);
					}}
				>
					<AiFillEdit color="#97969B" size={20} />
				</button>
			</div>
			{isValue ? (
				<>
					<div className="modal__title-control">
						<p className="modal__text">{text}</p>
					</div>
				</>
			) : (
				<div className="modal__title-control">
					<textarea
						className="modal__input"
						placeholder=""
						name={name}
						value={val}
						autoFocus
						ref={textRef}
						onChange={(e) => setVal(e.target.value)}
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
							setIsValue(true);
						}}
					>
						ok
					</button>
				</div>
			)}
		</label>
	);
};
