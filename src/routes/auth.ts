import express from 'express';
import { registerUser, loginUser, logout, getUser } from '../controllers/authController';
import { isAuthenticatedUser } from '../middlewares/auth';
const router = express.Router();

router.route('/me').get(isAuthenticatedUser, getUser)

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

export default router;