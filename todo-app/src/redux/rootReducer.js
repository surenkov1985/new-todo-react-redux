import { combineReducers } from "redux";
import { themeReducer } from "./theme/themeReducer";
import { projectsReducer } from "./projects/projectsReducer";

export const rootReducer = combineReducers({
	themeReducer,
    projectsReducer
});
