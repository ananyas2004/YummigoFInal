import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Disable button while submitting
        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:4000/api/user/reset-password", {
                token,
                newPassword,
            });

            if (response.data.success) {
                setMessage("Your password has been updated successfully!");
                setError("");
            } else {
                setMessage("");
                setError(response.data.message || "Something went wrong!");
            }
        } catch (error) {
          console.log(error)
            setMessage("");
            setError("Error updating password, please try again.");
        } finally {
            setIsSubmitting(false); // Re-enable the button after the request completes
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Reset Password"}
                </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ResetPassword;
