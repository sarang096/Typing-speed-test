import React from "react";
import { useTheme } from "./components/pages/ThemeContext";
import { useFontSize } from "./components/pages/FontSizeContext";
import { useFontStyle } from "./components/pages/FontStyleContext";
import "./settings.css";

const Settings = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { fontStyle, setFontStyle } = useFontStyle();

  const handleThemeChange = (event) => {
    setIsDarkTheme(event.target.checked);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleFontStyleChange = (event) => {
    const selectedFont = event.target.value;
    console.log("Font style changed to:", selectedFont); // Debug log
    setFontStyle(selectedFont);
  };
  

  return (
    <div className={`settings ${isDarkTheme ? "dark-theme" : ""}`}>
      <h1>Settings</h1>
      <div className="setting-item">
        <label htmlFor="theme-toggle">Dark Theme</label>
        <input
          type="checkbox"
          id="theme-toggle"
          checked={isDarkTheme}
          onChange={handleThemeChange}
        />
      </div>
      <div className="setting-item">
        <label htmlFor="font-size">Font Size</label>
        <input
          type="number"
          id="font-size"
          value={fontSize}
          onChange={handleFontSizeChange}
          min="10"
          max="30"
        />
      </div>
      <div className="setting-item">
        <label htmlFor="font-style">Font Style</label>
        <select
          id="font-style"
          value={fontStyle}
          onChange={handleFontStyleChange}
        >
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
