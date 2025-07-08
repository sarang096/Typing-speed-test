import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset the error message

        axios.post('http://localhost:3001/signup', { email, name, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => {
                if (err.response) {
                    console.log("Error Response:", err.response); // Log the entire error response
                    if (err.response.status === 409) {
                        setErrorMessage("Email already exists. Please use a different email.");
                    } else {
                        setErrorMessage("An error occurred. Please try again.");
                    }
                } else {
                    console.log("Error:", err);
                    setErrorMessage("An error occurred. Please try again.");
                }
            });
    }

    return (
        <div className='form-box'>
            <div className="register-form">
                <div className="top">
                    <span>Have an account? <Link to="/login">Login</Link></span>
                    <header>Sign Up</header>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            className="input-field" 
                            placeholder="Username" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            className="input-field" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input type="submit" className="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
