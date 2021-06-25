import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
// import APIFeatures from '../utils/apiFeatures.js';
import Task from '../models/Task';
// import User from '../models/User';
// import { ITaskViewSchema } from '../models/TaskView';
import ITask from '../models/Task';
import moment from 'moment';
// import ErrorHandler from '../utils/errorHandler';


export const getMyTasks = catchAsyncErrors(async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
    let myTasks: Array<typeof ITask> = [];
    const tasks = await Task.find({ user: req.user.id })

    tasks.forEach((task: any) => {
        task.createdAt = moment(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
        myTasks.push(task);
    })

    res.status(200).json({
        success: true,
        myTasks
    })

})

export const getAdminTasks = catchAsyncErrors(async (req: any, res: any, next: NextFunction): Promise<Response | void> => {

    // let allTasks: Array<typeof ITask> = [];
    let allTasks: any = [];
    const tasks: any = await Task.find();

    tasks.forEach((task: any) => {
        task.createdAt = moment(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
        allTasks.push(task);
    })
    res.status(200).json({
        success: true,
        allTasks
    })
})

export const newTask = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
    // let allTasks: Array<typeof ITaskSchema> = [];
    const { title, description } = req.body.newTask;

    let task: any = new Task();

    task.user = req.user._id;
    task.title = title;
    task.description = description;
    task.createdAt = Date.now();

    const createdTask = await task.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
        createdTask
    })

})

export const getSingleTask = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        // return next(new ErrorHandler('Task not found', 404))
        res.status(404).json({
            message: 'Task not found'
        })
    }
    res.status(200).json({
        success: true,
        task
    })
})


export const updateTask = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    let task = await Task.findById(req.params.id);

    if (!task) {
        // return next(new ErrorHandler('Task not found', 404))
        res.status(404).json({
            message: 'Task not found'
        })
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        task
    })
})

export const deleteTask = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        // return next(new ErrorHandler('Task not found', 404))
        res.status(404).json({
            message: 'Task not found'
        })
    }

    await task.remove();

    res.status(200).json({
        success: true,
        message: 'The task has been deleted.'
    })
})