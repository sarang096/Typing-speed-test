import React from "react";
import "./signout.css"; 
import { useNavigate } from "react-router-dom"; // import useNavigate

function Signout() {
  const navigate = useNavigate(); // use the useNavigate hook to navigate

  const handleSignout = () => {
    console.log("User signed out");
    
    // After signing out, navigate to the signup page
    navigate("/signup");
  };

  const handleCancel = () =>{
    navigate("/home");
  };

  return (
    <div className="signout-container">
      <h3>Thank You for using TYPIFY.</h3>
      <h3>Are you sure you want to sign out?</h3>
      <br />
      <div>
        <button onClick={handleSignout} className="button-style">
            Sign Out
        </button>
        <button onClick={handleCancel} className="button-style">
            Cancel
        </button>
      </div>
    </div>
  );
}

export default Signout;
