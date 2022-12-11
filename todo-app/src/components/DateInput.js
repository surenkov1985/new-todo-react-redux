import dayjs from "dayjs";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import Button from "./Button";
import { DateString } from "./DateString";

export const DateInput = ({ timestamp, clickHandler, title }) => {
	const [inputTime, setInputTime] = useState();
	const [isTimeEdit, setIstimeEdit] = useState(false);

	const timeEditHandler = () => {
		clickHandler("endDate", inputTime);
		timeEditToggleHandler();
	}

	const timeEditToggleHandler = () => {
		setIstimeEdit(!isTimeEdit);
	}

	return (
		<div>
			<label className="modal__label">
				<div className="modal__title-control">
					<h2 className="modal__label-title">{title}</h2>
					<Button classList={["modal__title-btn"]} onClick={timeEditToggleHandler}>
						<AiFillEdit color="#97969B" size={20} />
					</Button>
				</div>
				<div className="modal__title-control">
					{timestamp ? (
						<>
							<DateString time={timestamp} />
						</>
					) : (
						<Button classList={["modal__btn"]} onClick={timeEditToggleHandler}>
							Add due date
						</Button>
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
							<Button classList={["modal__btn"]} onClick={timeEditHandler}>
								ok
							</Button>
						</>
					</div>
				)}
			</label>
		</div>
	);
};
