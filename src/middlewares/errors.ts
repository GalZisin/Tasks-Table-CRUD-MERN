import ErrorHandler from "../utils/errorHandler";
import { NextFunction } from "express";

export default (err: any, req: any, res: any, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }
        error.message = err.message;

        console.log("error: " + JSON.stringify(error))

        //Wrong Mongoose Object ID Error Message
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }


        //Handkibg Mongoose Valodation Error
        let Object: any;
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        //Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
            error = new ErrorHandler(message, 400);
        }
        //Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON web Token is invalid. Try again!!!'
            error = new ErrorHandler(message, 400);
        }
        //Handling Expire JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON web Token is Expired. Try again!!!'
            error = new ErrorHandler(message, 400);
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

}
