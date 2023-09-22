import { createContext } from 'react';

const ThemeContext = createContext({
    theme: 'light',        // default value
    toggleTheme: () => {}  // default empty function
});

export default ThemeContext;
