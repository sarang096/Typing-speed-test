import React, { createContext, useContext, useState, useEffect } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16); // Default font size

    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => useContext(FontSizeContext);