import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProject, selectProject } from "../redux/projects/actions";
import { AddCard } from "../components/AddProject";

export const SelectProject = () => {

    const { projects, selectedProject } = useSelector((state) => {
		return state.projectsReducer;
	});
	const dispatch = useDispatch();

	const [modalActive, setModalActive] = useState(false);

	const closeModal = () => {
		setModalActive(false);
	};

	const createProject = (title, id) => {
		const data = { title: title, id: id, statuses: ["Queue"] };
		dispatch(addProject(data));
		closeModal();
	};

	const projectSelected = (obj) => {
		localStorage.setItem("selected-project", JSON.stringify(obj));
		dispatch(selectProject(obj));
	};


    return (
        <div className="container__todo todo">
	
            <div className="todo__main">
                <div className="todo__container">
                    {projects.map((item) => {
                        return (
                            <div className="todo__project-link" key={item.id}>
                                <Link
                                    to={"../project"}
                                    className="todo__link"
                                    onClick={(e) => {
                                        projectSelected(item);
                                    }}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        );
                    })}
                    <div className="todo__project-link">
                        <button
                            className="todo__link"
                            onClick={(e) => {
                                setModalActive(true);
                            }}
                        >
                            + Add
                        </button>
                    </div>
                </div>
            </div>
	

	
	        {modalActive && <AddCard closeModal={closeModal} addProject={createProject} />}
        </div>
    )
}


