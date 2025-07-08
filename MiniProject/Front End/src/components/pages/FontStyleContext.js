import React, { createContext, useContext, useState } from 'react';

const FontStyleContext = createContext();

export const useFontStyle = () => useContext(FontStyleContext);

export const FontStyleProvider = ({ children }) => {
  const [fontStyle, setFontStyle] = useState('Arial'); // Default font style

  return (
    <FontStyleContext.Provider value={{ fontStyle, setFontStyle }}>
      {children}
    </FontStyleContext.Provider>
  );
};
