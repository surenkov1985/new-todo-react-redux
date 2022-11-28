import { CREATE_PROJECT, SELECT_PROJECT, SET_PROJECTS } from "./types"


export const createProject = (path) => {
    return {
        type: CREATE_PROJECT,
        path
    }
}

export const selectProject = (obj) => {
    return {
        type: SELECT_PROJECT,
        obj: obj
    }
}

export const setProjects = (arr) => {
    return {
        type: SET_PROJECTS,
        arr
    }

}