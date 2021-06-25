"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var taskController_1 = require("../controllers/taskController");
var auth_1 = require("../middlewares/auth");
var router = express_1.Router();
router.route('/tasks/me').get(auth_1.isAuthenticatedUser, taskController_1.getMyTasks);
router.route('/admin/tasks').get(auth_1.isAuthenticatedUser, auth_1.authorizeRoles('admin'), taskController_1.getAdminTasks);
router.route('/task/new').post(auth_1.isAuthenticatedUser, taskController_1.newTask);
router.route('/task/:id')
    .get(auth_1.isAuthenticatedUser, taskController_1.getSingleTask)
    .put(auth_1.isAuthenticatedUser, taskController_1.updateTask)
    .delete(auth_1.isAuthenticatedUser, taskController_1.deleteTask);
exports.default = router;
