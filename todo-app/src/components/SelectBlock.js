import classNames from "classnames";
import React, { useState } from "react";

export const SelectBlock = ({ state, states, clickHandler, title, name }) => {
	const [stateClass, setStateClass] = useState("");

	return (
		<div className="modal__title-control">
			<span>{title}</span>
			<button
				className="modal__state-btn"
				onClick={() => {
					setStateClass("active");
				}}
			>
				{state}
			</button>
			<ul className={classNames("modal__select", stateClass)}>
				{states.map((status) => {
					return (
						<li
							className="modal__option"
							key={status.text}
							onClick={() => {
								clickHandler(name, status);
								setStateClass("");
							}}
						>
							{status.text}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
