import express from 'express';
import { loginUser, registerUser, forgotPassword,resetPassword } from '../controllers/userController.js';
const userRouter = express.Router();
import { sendResetEmail } from '../utils/emailUtils.js';

// Register and login routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Forgot password route
userRouter.post('/forgot-password',forgotPassword);
userRouter.post('/reset-password', resetPassword);
export default userRouter;
