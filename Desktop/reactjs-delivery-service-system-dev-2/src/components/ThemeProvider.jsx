import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';
import { themes } from './themes';

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

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

export default ThemeProvider;
