import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Forgot() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

    const changePassword = async () => {
        try {
            const response = await fetch('http://localhost:3001/updatePassword', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, newPassword: newPassword }),
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (err) {
                throw new Error("Response is not JSON");
            }

            if (response.ok) {
                alert("Password changed successfully");
                setNewPassword("");
            } else {
                alert(result?.error || "Failed to change password.");
            }
        } catch (err) {
            console.error('Error updating password:', err);
            setErrorMessage('Failed to update password.');
        }
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset the error message
        changePassword(); // Call the correct function
    };

    return (
        <div className='form-box'>
            <div className="forgot-form">
                <div className="top">
                    <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
                    <header>Forgot Password</header>
                </div>
                <form onSubmit={handleUpdatePassword}>
                    <div className="input-box">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            className="input-field"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input type="submit" className="submit" value="Update Password" />
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Forgot;
