import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import "../styles/dashboardCharts/dashboard-charts.css";

export const themes = {
    light: {
        '--bg-primary': '#f5f5f5',
        '--bg-secondary': '#ffffff',
        '--text-primary': '#333333',
    },
    dark: {
        '--bg-primary': '#333333',
        '--bg-secondary': '#444444',
        '--text-primary': '#f5f5f5',
    }
};

export function ThemeSwitchButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}
