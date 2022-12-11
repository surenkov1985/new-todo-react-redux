import {
	ADD_PROJECT,
	ADD_STATUS,
	CHECKED_LIST,
	CREATE_PROJECT,
	CREATE_TASK,
	REMOVE_ITEM,
	REMOVE_TASK,
	SELECT_PROJECT,
	SET_PROJECTS,
	UPDATE_PROJECTS,
	UPDATE_TASK,
} from "./types";
import { Project } from "../../models";

const initialState = {
	user: {userName: "User"},
	projects: JSON.parse(localStorage.getItem("todo-projects")) || [new Project("Test")],
	selectedProject: JSON.parse(localStorage.getItem("selected-project")) || null,
};

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROJECTS:
			return { ...state, projects: action.arr };

		case UPDATE_PROJECTS:
			return {
				...state,
				projects: state.projects.map((obj) => {
					if (obj.id === action.obj.id) {
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
				selectedProject: { ...state.selectedProject, statuses: [...state.selectedProject.statuses, action.obj] },
			};

		case ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, new Project(action.title)],
			};

		case CREATE_TASK:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: [...state.selectedProject.tasks, action.obj],
					taskCounter: (state.selectedProject.taskCounter += 1),
				},
			};

		case UPDATE_TASK:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.map((task) => {
						if (task.id === action.id) {
							return { ...task, ...action.obj };
						}
						return task;
					}),
				},
			};
		case REMOVE_TASK:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.filter(task => task.id !== action.id),
				},
			};
		case CHECKED_LIST:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.map((task) => {
						if (task.id === action.taskId) {
							return {
								...task,
								checkList: task.checkList.map((check) => {
									if (check.id === action.checkId) {
										const checked = !check.checked;
										console.log(!check.checked);
										return { ...check, checked: checked };
									}
									return check;
								}),
							};
						}
						return task;
					}),
				},
			};
		case REMOVE_ITEM:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					tasks: state.selectedProject.tasks.map((task) => {
						if (task.id === action.taskId) {
							return {
								...task,
								checkList: task.checkList.filter((check) => check.id !== action.checkId),
							};
						}
						return task;
					}),
				},
			};
		default:
			return state;
	}
};
