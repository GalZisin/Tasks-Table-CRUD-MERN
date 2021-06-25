import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { myTasksReducer, tasksReducer, newTaskReducer, taskReducer, taskDetailsReducer } from './reducers/taskReducers'
import { authReducer } from './reducers/userReducers'

const reducer = combineReducers({
    tasks: tasksReducer,
    task: taskReducer,
    myTasks: myTasksReducer,
    taskDetails: taskDetailsReducer,
    newTask: newTaskReducer,
    auth: authReducer
})

let initialState = {}
const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

export type RootState = ReturnType<typeof store.getState>

export default store;