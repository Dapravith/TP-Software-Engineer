// Header.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Assuming ThemeContext is exported from ThemeContext.jsx

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <button style={styles.button} onClick={toggleTheme}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: 'var(--header-background)',
        color: 'var(--header-text-color)',
    },
    title: {
        margin: '0',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'var(--button-background)',
        color: 'var(--button-text-color)',
        transition: 'background-color 0.3s',
    },
};

export default Header;
