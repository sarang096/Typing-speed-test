import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Login from "./login";
import Signup from "./signup";
import Home from "./components/pages/home";
import Leaderboard from "./leaderboard";
import AboutUs from "./aboutus";
import Settings from "./settings";
import Signout from "./signout";
import Profile from "./profile";
import Inspiration from "./inspiration";
import OurTeam from "./ourteam";
import ContactUs from "./contact";
import Feedback from "./feedback";
import History from "./history";
import Forgot from "./forgot";
import { ThemeProvider } from "./components/pages/ThemeContext";
import { FontSizeProvider } from "./components/pages/FontSizeContext";
import { FontStyleProvider, useFontStyle } from "./components/pages/FontStyleContext"; // Import FontStyleProvider and useFontStyle
import { useEffect } from "react";

// Use FontStyle context to get fontStyle
function AppContent() {
  const { fontStyle } = useFontStyle(); // Access the fontStyle context
  
  useEffect(() => {
    // Ensures that font is applied dynamically when it changes
    document.body.style.fontFamily = fontStyle;
  }, [fontStyle]); // Apply fontStyle to the body whenever it changes

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/history" element={<History />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/inspiration" element={<Inspiration />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <FontStyleProvider>
          <AppContent />
        </FontStyleProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}

export default App;
