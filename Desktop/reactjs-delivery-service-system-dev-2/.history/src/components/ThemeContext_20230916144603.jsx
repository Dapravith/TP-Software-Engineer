import React, { createContext, useState, useEffect } from 'react';
import { Themes } from './Themes';

// Create the context
const ThemeContext = createContext({
    theme: 'light',         // default value
    toggleTheme: () => {}   // default empty function
});

// ThemeProvider component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Apply the theme styles whenever the theme changes
    useEffect(() => {
        const currentThemeStyles = themes[theme];
        for (const styleKey in currentThemeStyles) {
            document.documentElement.style.setProperty(styleKey, currentThemeStyles[styleKey]);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
