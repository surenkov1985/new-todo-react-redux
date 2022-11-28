import React, { useEffect, useState } from "react";

export default function Project(props) {
    const [project, setProject] = useState()

    useEffect(() => {
        setProject(JSON.parse(localStorage.getItem("selected-project")))
    },[])

	console.log(project);

	return (
		<div className="todo__main">
			<div className="todo__container">
				<div className="todo__create">{/* <Create createHandler={setState} createText="Добавить колонку" name="state" /> */}</div>
				{/* {modalActive && <AddCard obj={obj} closeModal={closeModal} states={states} />} */}
			</div>
		</div>
	);
}
