import { THEME_TOGGLE } from "./types";
import React from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

const sunBtn = <BsFillSunFill size={26} color="#FFF" />;
const moonBtn = <BsFillMoonFill size={26} color="#FFF" />;

const initialState = {
	icon: moonBtn,
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case THEME_TOGGLE:
			if (state.icon === moonBtn) {
				return { ...state, icon: (state.icon = sunBtn) };
			} else {
				return {
					...state,
					icon: (state.icon = moonBtn),
				};
			}

		default:
			return state;
	}
};
