import React from "react";
import { TiDelete } from "react-icons/ti";
import { BsUiChecks } from "react-icons/bs";
import { DateString } from "../components/DateString";
import { FileElem } from "./FileElem";

export const TodoCard = ({ data, deleteCard, cardClick, id }) => {
	return (
		<article
			className="todo__card card"
			onClick={() => cardClick(data)}
			// onDragStart={(e) => dragStartHandler(data, id)} draggable
		>
			<h2 className="card__title">{data.title}</h2>
			<div className="card__description">{data.description && <p className="card__text">{data.description}</p>}</div>
			<div className="todo__time-container">{data.endDate && <DateString time={data.time} />}</div>
			{data.file && (
				<div className="card__file">
					<FileElem file={data.file} type={data.fileType} />
				</div>
			)}
			<div className="card__icons">{data.checkList && <BsUiChecks />}</div>

			<button className="card__delete">
				<TiDelete
					color="#ff0000"
					size={20}
					onClick={(e) => {
						deleteCard(e, id);
					}}
				/>
			</button>
		</article>
	);
};
