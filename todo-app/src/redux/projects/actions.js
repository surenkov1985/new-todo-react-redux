import { ADD_PROJECT, ADD_STATUS, CREATE_PROJECT, CREATE_TASK, REMOVE_TASK, SELECT_PROJECT, SET_PROJECTS, UPDATE_PROJECTS, UPDATE_TASK } from "./types"


export const createProject = (path) => {
    return {
        type: CREATE_PROJECT,
        path
    }
}

export const updateProjects = (obj) => {
    return {
        type: UPDATE_PROJECTS, 
        obj
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

export const addStatus = (obj) => {
    return {
        type: ADD_STATUS,
        obj
    }
}

export const addProject = (obj) => {
    return {
        type: ADD_PROJECT,
        obj
    }
}

export const addTask = (obj) => {
    return {
        type: CREATE_TASK,
        obj
    }
}

export const updateTask = (obj) => {
    return {
        type: UPDATE_TASK,
        obj
    }
}

export const removeTask = (id) => {
    return {
        type: REMOVE_TASK, id
    }
}