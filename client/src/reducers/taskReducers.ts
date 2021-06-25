import {
    ADMIN_TASKS_REQUEST,
    ADMIN_TASKS_SUCCESS,
    ADMIN_TASKS_FAIL,
    MY_TASKS_REQUEST,
    MY_TASKS_SUCCESS,
    MY_TASKS_FAIL,
    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    DELETE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_FAIL,
    UPDATE_TASK_RESET,
    DELETE_TASK_RESET,
    CLEAR_ERRORS
} from '../constants/taskConstants'
import { IAction, ITask } from "../types/interfaces";

interface IState {
    tasks?: ITask[];
    task?: ITask;
    loading?: boolean;
    isUpdated?: boolean;
    isDeleted?: boolean;
    error?: string;
}

export const tasksReducer = (state: any = { tasks: [] }, action: IAction) => {
    switch (action.type) {
        case ADMIN_TASKS_REQUEST:
            return {
                loading: true,
                tasks: []
            }
        case ADMIN_TASKS_SUCCESS:
            return {
                loading: false,
                tasks: action.payload
            }
        case ADMIN_TASKS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const taskReducer = (state: IState = {}, action: IAction) => {
    switch (action.type) {
        case DELETE_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_TASK_FAIL:
        case UPDATE_TASK_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_TASK_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_TASK_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const taskDetailsReducer = (state: any = { task: {} }, action: IAction) => {
    switch (action.type) {

        case TASK_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TASK_DETAILS_SUCCESS:
            return {
                loading: false,
                task: action.payload
            }

        case TASK_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newTaskReducer = (state: any = { task: {} }, action: IAction) => {
    switch (action.type) {

        case NEW_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TASK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                task: action.payload.task
            }

        case NEW_TASK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const myTasksReducer = (state: any = { tasks: [] }, action: IAction) => {
    switch (action.type) {

        case MY_TASKS_REQUEST:
            return {
                loading: true
            }

        case MY_TASKS_SUCCESS:
            return {
                loading: false,
                tasks: action.payload
            }

        case MY_TASKS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}