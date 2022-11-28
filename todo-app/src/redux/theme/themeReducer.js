import { THEME_TOGGLE } from "./types";

const initialState = {
	theme: localStorage.hasOwnProperty("todo-theme") ? localStorage.getItem("todo-theme") : "light",
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case THEME_TOGGLE:
			return { ...state, theme: state.theme === "dark" ? "light" : "dark" };

		default:
			return state;
	}
};
