import { CREATE_PROJECT, SELECT_PROJECT, SET_PROJECTS } from "./types";
import uniqid from "uniqid";

const initialState = {
	projects: [{ title: "test", id: uniqid(), statuses: ["Queue", "Development", "Done"] }],
	selectedProject: null,
};

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROJECTS:
			return { ...state, projects: action.arr };

		case CREATE_PROJECT:
			return { ...state, projects: [...state.projects, action.path] };

		case SELECT_PROJECT:
			return { ...state, selectedProject: action.obj };

		default:
			return state;
	}
};
