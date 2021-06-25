import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

//Check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

    const token = req.cookies.token1 || '';
    if (!token) {
        return next(new ErrorHandler('Login first to access this resources.', 401))
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

//Handling users roles
export const authorizeRoles = (...roles: string[]) => {
    return (req: any, res: any, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to accesss this resource.`, 403));
        }
        next();
    }
}