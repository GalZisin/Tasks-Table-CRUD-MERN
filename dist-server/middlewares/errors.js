"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.default = (function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        var error = __assign({}, err);
        error.message = err.message;
        console.log("error: " + JSON.stringify(error));
        //Wrong Mongoose Object ID Error Message
        if (err.name === 'CastError') {
            var message = "Resource not found. Invalid: " + err.path;
            error = new errorHandler_1.default(message, 400);
        }
        //Handkibg Mongoose Valodation Error
        var Object_1;
        if (err.name === 'ValidationError') {
            var message = Object_1.values(err.errors).map(function (value) { return value.message; });
            error = new errorHandler_1.default(message, 400);
        }
        //Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            var message = "Duplicate " + Object_1.keys(err.keyValue) + " entered.";
            error = new errorHandler_1.default(message, 400);
        }
        //Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            var message = 'JSON web Token is invalid. Try again!!!';
            error = new errorHandler_1.default(message, 400);
        }
        //Handling Expire JWT error
        if (err.name === 'TokenExpiredError') {
            var message = 'JSON web Token is Expired. Try again!!!';
            error = new errorHandler_1.default(message, 400);
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
});
