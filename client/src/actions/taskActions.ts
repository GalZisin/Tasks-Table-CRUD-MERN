import axios from 'axios';
import {
    MY_TASKS_REQUEST,
    MY_TASKS_SUCCESS,
    MY_TASKS_FAIL,
    ADMIN_TASKS_REQUEST,
    ADMIN_TASKS_SUCCESS,
    ADMIN_TASKS_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL,
    UPDATE_TASK_REQUEST,
    DELETE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_FAIL,
    CLEAR_ERRORS
} from '../constants/taskConstants'
import { ITask, IConfigHeaders } from '../types/interfaces';

//const baseUrl = 'http://localhost:4000';
const baseUrl = '';

export const getMyTasks = () => async (dispatch: Function) => {
    try {

        dispatch({ type: MY_TASKS_REQUEST })

        const { data } = await axios.get(baseUrl + `/api/v1/tasks/me`, { withCredentials: true })
        dispatch({
            type: MY_TASKS_SUCCESS,
            payload: data.myTasks
        })
    } catch (error) {
        dispatch({
            type: MY_TASKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminTasks = () => async (dispatch: Function) => {

    try {

        dispatch({ type: ADMIN_TASKS_REQUEST })

        const { data } = await axios.get(baseUrl + `/api/v1/admin/tasks`, { withCredentials: true })

        dispatch({
            type: ADMIN_TASKS_SUCCESS,
            payload: data.allTasks
        })

    } catch (error) {

        dispatch({
            type: ADMIN_TASKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTaskDetails = (id: string) => async (dispatch: Function) => {
    try {

        dispatch({ type: TASK_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/task/${id}`)
        dispatch({
            type: TASK_DETAILS_SUCCESS,
            payload: data.task
        })
    } catch (error) {
        dispatch({
            type: TASK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const newTask = (newTask: any) => async (dispatch: Function) => {
    console.log()
    try {

        dispatch({ type: NEW_TASK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(baseUrl + `/api/v1/task/new`, { newTask }, config)

        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}



// Delete tasks (Admin)
export const deleteTask = (id: string) => async (dispatch: Function) => {
    try {

        dispatch({ type: DELETE_TASK_REQUEST })
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(baseUrl + `/api/v1/task/${id}`)

        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}


// Update task (ADMIN)
export const updateTask = (id: string, taskData: ITask) => async (dispatch: Function) => {

    const title = taskData?.task?.title;
    const description = taskData?.task?.description;

    try {

        dispatch({ type: UPDATE_TASK_REQUEST })

        const config: IConfigHeaders = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.defaults.withCredentials = true;
        const { data } = await axios.put(baseUrl + `/api/v1/task/${id}`, { title, description }, config)

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch: Function) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}