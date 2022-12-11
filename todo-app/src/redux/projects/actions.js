import { ADD_PROJECT, ADD_STATUS, CHECKED_LIST, CREATE_PROJECT, CREATE_TASK, REMOVE_ITEM, REMOVE_TASK, SELECT_PROJECT, SET_PROJECTS, UPDATE_PROJECTS, UPDATE_TASK } from "./types"


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

export const addProject = (title) => {
    return {
        type: ADD_PROJECT,
        title
    }
}

export const addTask = (obj) => {
    return {
        type: CREATE_TASK,
        obj
    }
}

export const updateTask = ({id, obj}) => {
    return {
        type: UPDATE_TASK,
        id,
        obj
    }
}

export const removeTask = (id) => {
    return {
        type: REMOVE_TASK, id
    }
}

export const checkedList = (taskId, checkId) => {
    return {
        type: CHECKED_LIST,
        taskId:taskId,
        checkId: checkId
    }
}

export const removeItem = (taskId, checkId) => {
    return {
		type: REMOVE_ITEM,
		taskId: taskId,
		checkId: checkId,
	};
}