import React from "react";

export default function Button(props) {

	const {classList, onClick} = props

	return (
		<button className={classList.join(" ")} onClick={onClick}>{props.children}</button>
	)
}