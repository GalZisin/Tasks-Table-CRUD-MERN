"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getSingleTask = exports.newTask = exports.getAdminTasks = exports.getMyTasks = void 0;
var catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
// import APIFeatures from '../utils/apiFeatures.js';
var Task_1 = __importDefault(require("../models/Task"));
var moment_1 = __importDefault(require("moment"));
// import ErrorHandler from '../utils/errorHandler';
exports.getMyTasks = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var myTasks, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                myTasks = [];
                return [4 /*yield*/, Task_1.default.find({ user: req.user.id })];
            case 1:
                tasks = _a.sent();
                tasks.forEach(function (task) {
                    task.createdAt = moment_1.default(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
                    myTasks.push(task);
                });
                res.status(200).json({
                    success: true,
                    myTasks: myTasks
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAdminTasks = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allTasks, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                allTasks = [];
                return [4 /*yield*/, Task_1.default.find()];
            case 1:
                tasks = _a.sent();
                tasks.forEach(function (task) {
                    task.createdAt = moment_1.default(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
                    allTasks.push(task);
                });
                res.status(200).json({
                    success: true,
                    allTasks: allTasks
                });
                return [2 /*return*/];
        }
    });
}); });
exports.newTask = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, task, createdTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body.newTask, title = _a.title, description = _a.description;
                task = new Task_1.default();
                task.user = req.user._id;
                task.title = title;
                task.description = description;
                task.createdAt = Date.now();
                return [4 /*yield*/, task.save({ validateBeforeSave: false })];
            case 1:
                createdTask = _b.sent();
                res.status(201).json({
                    success: true,
                    createdTask: createdTask
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getSingleTask = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Task_1.default.findById(req.params.id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    // return next(new ErrorHandler('Task not found', 404))
                    res.status(404).json({
                        message: 'Task not found'
                    });
                }
                res.status(200).json({
                    success: true,
                    task: task
                });
                return [2 /*return*/];
        }
    });
}); });
exports.updateTask = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Task_1.default.findById(req.params.id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    // return next(new ErrorHandler('Task not found', 404))
                    res.status(404).json({
                        message: 'Task not found'
                    });
                }
                return [4 /*yield*/, Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false
                    })];
            case 2:
                task = _a.sent();
                res.status(200).json({
                    success: true,
                    task: task
                });
                return [2 /*return*/];
        }
    });
}); });
exports.deleteTask = catchAsyncErrors_1.default(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Task_1.default.findById(req.params.id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    // return next(new ErrorHandler('Task not found', 404))
                    res.status(404).json({
                        message: 'Task not found'
                    });
                }
                return [4 /*yield*/, task.remove()];
            case 2:
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: 'The task has been deleted.'
                });
                return [2 /*return*/];
        }
    });
}); });
