import { Router } from 'express';
import {
    newTask,
    getMyTasks,
    getAdminTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} from '../controllers/taskController';

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth';

const router = Router();

router.route('/tasks/me').get(isAuthenticatedUser, getMyTasks);

router.route('/admin/tasks').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminTasks);

router.route('/task/new').post(isAuthenticatedUser, newTask);

router.route('/task/:id')
    .get(isAuthenticatedUser, getSingleTask)
    .put(isAuthenticatedUser, updateTask)
    .delete(isAuthenticatedUser, deleteTask);

export default router;
