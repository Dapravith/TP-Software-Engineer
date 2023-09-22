import React, { createContext, useState, useEffect } from 'react';
import { Themes } from './Themes';

// Create the context
const ThemeContext = createContext({
    theme: 'light',         // default value
    toggleTheme: () => {}   // default empty function
});

// ThemeProvider component
const ThemeProvider = ({ children }) => {
    const [ThemeS, setThemes] = useState('light');

    // Apply the theme styles whenever the theme changes
    useEffect(() => {
        const currentThemeStyles = themes[Themes];
        for (const styleKey in currentThemeStyles) {
            document.documentElement.style.setProperty(styleKey, currentThemeStyles[styleKey]);
        }
    }, [Themes]);

    const toggleTheme = () => {
        setThemes(Themes === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ Themes, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
