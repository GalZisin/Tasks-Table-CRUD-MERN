"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
router.route('/me').get(auth_1.isAuthenticatedUser, authController_1.getUser);
router.route('/register').post(authController_1.registerUser);
router.route('/login').post(authController_1.loginUser);
router.route('/logout').get(authController_1.logout);
exports.default = router;
