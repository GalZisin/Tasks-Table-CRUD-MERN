import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import sendToken from '../utils/jwtToken';
import { Request, Response, NextFunction } from "express";

export const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        // return next(new ErrorHandler('Please fill in all the fields', 400));
        res.status(400).json({
            message: 'Please fill in all the fields'
        })
    }

    const existUser = await User.findOne({ email }).select('+password')
    if (existUser) {
        // return next(new ErrorHandler('User already exists', 400))
        res.status(400).json({
            message: 'User already exists'
        })
    }

    const user = await User.create([{
        name,
        email,
        password
    }])

    const newUser = await User.findOne({ email }).select('+password')

    sendToken(newUser, 200, res);
})

export const loginUser = catchAsyncErrors(async (req: any, res: any, next: any): Promise<any> => {

    const { email, password } = req.body;

    //Check if email and password is entered by user
    if (!email || !password) {
        // return next(new ErrorHandler('Please enter email & password', 400));
        res.status(400).json({
            message: 'Please enter email & password'
        })
    }
    //Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        // return next(new ErrorHandler('Invalid Email or Password', 401))
        res.status(401).json({
            message: 'Invalid Email or Password'
        })
    }

    //Checkes if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        // return next(new ErrorHandler('Invalid Email or Password', 401))
        res.status(401).json({
            message: 'Invalid Email or Password'
        })
    }

    sendToken(user, 200, res)
})

// Logout user => /apiv1/logout

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    res.cookie('token1', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        successs: true,
        message: 'Logged out'
    })

})

// Get currently logged in user details   =>   /api/v1/me
export const getUser = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})