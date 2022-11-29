import {
	ADD_PROJECT,
	ADD_STATUS,
	CREATE_PROJECT,
	CREATE_TASK,
	REMOVE_TASK,
	SELECT_PROJECT,
	SET_PROJECTS,
	UPDATE_PROJECTS,
	UPDATE_TASK,
} from "./types";
import uniqid from "uniqid";

const initialState = {
	projects: localStorage.hasOwnProperty("todo-projects")
		? JSON.parse(localStorage.getItem("todo-projects"))
		: [{ title: "test", id: uniqid(), statuses: ["Queue", "Development", "Done"], tasks: [] }],
	selectedProject: localStorage.hasOwnProperty("selected-project") ? JSON.parse(localStorage.getItem("selected-project")) : null,
};

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROJECTS:
			return { ...state, projects: action.arr };

		case UPDATE_PROJECTS:
			return {
				...state,
				projects: state.projects.map((obj) => {
					if (obj.id === state.selectedProject.id) {
						return action.obj;
					}

					return obj;
				}),
			};

		case CREATE_PROJECT:
			return { ...state, projects: [...state.projects, action.path] };

		case SELECT_PROJECT:
			return { ...state, selectedProject: action.obj };

		case ADD_STATUS:
			return {
				...state,
				projects: state.projects.map((obj) => {
					if (obj.id === state.selectedProject.id) {
						return action.obj;
					}

					return obj;
				}),
			};

		case ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.obj],
			};

		case CREATE_TASK:
			console.log({ ...state.selectedProject, tasks: [...state.selectedProject.tasks, action.obj] });
			return {
				...state,
				selectedProject: { ...state.selectedProject, tasks: [...state.selectedProject.tasks, action.obj] },
			};

		case UPDATE_TASK:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.map((task) => {
						if (task.id === action.obj.id) {
							return action.obj;
						}
						return task;
					}),
				},
			};
		case REMOVE_TASK:
			const removeIndex = state.selectedProject.tasks.findIndex((task) => task.id === action.id - 1);
			console.log(removeIndex);
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.splice(removeIndex, 1),
				},
			};
		default:
			return state;
	}
};
