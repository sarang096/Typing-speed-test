    import React from 'react';
    import { useTheme } from './ThemeContext';
    import { useFontSize } from './FontSizeContext';
    import './SettingsNavbar.css';

    const Settings = ({ 
        wordCount, 
        setWordCount, 
        usePunctuation, 
        setUsePunctuation, 
        useNumbers, 
        setUseNumbers 
    }) => {
        const { isDarkTheme, setIsDarkTheme } = useTheme();
        const { fontSize, setFontSize } = useFontSize();

        return (
            <div className="navbar">
                {/* <div className="navbar-item">
                    <label>Dark Theme</label>
                    <div className="button-container">
                        <button onClick={() => setIsDarkTheme(false)}>Off</button>
                        <button onClick={() => setIsDarkTheme(true)}>On</button>
                    </div>
                </div>
                */}
                <div className="navbar-item">
                    <label>Font Size</label>
                    <input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        min="10"
                        max="30"
                    />
                </div> 
                <div className="navbar-item">
                    <label>Word Count</label>
                    <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))}>
                        <option value={10}>10 Words</option>
                        <option value={30}>30 Words</option>
                        <option value={100}>100 Words</option>
                    </select>
                </div>
                <div className="navbar-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={usePunctuation}
                            onChange={(e) => setUsePunctuation(e.target.checked)}
                        />
                        Punctuation
                    </label>
                </div>
                <div className="navbar-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={useNumbers}
                            onChange={(e) => setUseNumbers(e.target.checked)}
                        />
                        Numbers
                    </label>
                </div>
            </div>
        );
    };

    export default Settings;
