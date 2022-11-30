import dayjs from "dayjs";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { DateString } from "./DateString";

export const DateInput = ({ timestamp, clickHandler, title }) => {
	const [inputTime, setInputTime] = useState();
	const [isTimeEdit, setIstimeEdit] = useState(false);

	return (
		<div>
			<label className="modal__label">
				<div className="modal__title-control">
					<h2 className="modal__label-title">{title}</h2>
					<button className="modal__title-btn" onClick={() => {}}>
						<AiFillEdit
							color="#97969B"
							size={20}
							onClick={() => {
								setIstimeEdit(!isTimeEdit);
							}}
						/>
					</button>
				</div>
				<div className="modal__title-control">
					{timestamp ? (
						<>
							<DateString time={timestamp} />
						</>
					) : (
						<button
							className="modal__btn"
							onClick={() => {
								setIstimeEdit(!isTimeEdit);
							}}
						>
							Add due date
						</button>
					)}
				</div>

				{isTimeEdit && (
					<div className="modal__title-control">
						<>
							<input
								className="modal__input"
								name="endTime"
								type="datetime-local"
								onChange={(e) => setInputTime(dayjs(e.target.value).valueOf())}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										clickHandler("endDate", inputTime);
										setIstimeEdit(!isTimeEdit);
									}
								}}
							/>
							<button
								className="modal__btn"
								onClick={() => {
									clickHandler("endDate", inputTime);
									setIstimeEdit(!isTimeEdit);
								}}
							>
								ok
							</button>
						</>
					</div>
				)}
			</label>
		</div>
	);
};
