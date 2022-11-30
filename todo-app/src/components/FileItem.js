import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { FileElem } from "./FileElem";
import { fileRead } from "../js/functions";

export const FileInput = ({ value, name, checkHandler, type, setErr }) => {
	const [file, setFile] = useState();
	const [isValue, setIsValue] = useState(false);
	
	useEffect(() => {
		if (value) {
			setFile(value);
			setIsValue(true);
		} else {
			setIsValue(false);
		}
	}, [value]);

	return (
		<>
			{!isValue && (
				<label className="modal__label">
					<button className="false-input">
						<GrAttachment size={18} color="#646464" />
						Select a file or drag and drop a file onto a card
					</button>
					<input
						type="file"
						className="modal__input file-input"
						placeholder="Добавьте файл"
						name={name}
						onChange={(e) => {
							fileRead(e.target.files[0], setErr, checkHandler);
							setIsValue(!isValue);
						}}
					/>
				</label>
			)}
			{isValue && (
				<div
					className="modal__file"
				>
					<FileElem file={file} type={type} />
				</div>
			)}
		</>
	);
};
