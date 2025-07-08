import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        // Load the theme preference from localStorage if available
        const savedTheme = localStorage.getItem('isDarkTheme');
        if (savedTheme !== null) {
            setIsDarkTheme(savedTheme === 'true');
        }

        // Apply the theme to the body element
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    // Store the theme preference in localStorage
    const toggleTheme = (value) => {
        setIsDarkTheme(value);
        localStorage.setItem('isDarkTheme', value);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
