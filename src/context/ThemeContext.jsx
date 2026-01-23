import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isLightMode, setIsLightMode] = useState(true);

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [isLightMode]);

    const toggleTheme = () => {
        setIsLightMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
