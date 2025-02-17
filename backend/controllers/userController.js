import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js'; // Ensure this import is correct
import { sendResetEmail } from '../utils/emailUtils.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Email not found.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1-hour expiry
        await user.save();

        // Send reset email
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        await sendResetEmail(email, resetLink);  // Make sure to send the actual link, not the token alone

        res.json({ success: true, message: 'Password reset email sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body; // Receive the token and new password from the request body
    console.log("hello")
    try {
        console.log("Resetting password for token:", token);

        // 1. Find the user with the reset token
        const user = await userModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            console.log("Invalid or expired token");
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // 2. Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 3. Update the user's password and clear reset token
        user.password = hashedPassword;
        user.resetToken = undefined; // Clear the reset token after password reset
        user.resetTokenExpiry = undefined;
        await user.save();

        // 4. Return a success response
        console.log("Password reset successful");
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(400).json({ success: false, message: 'Error resetting password' });
    }
};


export { loginUser, registerUser, forgotPassword, resetPassword };
