import React, { createContext, useState, useEffect, useContext } from 'react';

// Assuming themes are in the same folder as theme.jsx for simplicity
import { theme } from './theme';

// Create the ThemeContext
export const ThemeContext = createContext({
    theme: 'light',         // default value
    toggleTheme: () => {}   // default empty function
});

export const ThemeSwitchButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
    );
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Apply the theme styles whenever the theme changes
    useEffect(() => {
        const currentThemeStyles = theme[theme];
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
