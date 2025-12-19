import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Hook to easily consume the context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Initialize theme based on local storage or system preference
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'dark'; // Default theme for server-side or initial render
    });

    // Effect to apply the 'dark' class to the document root (<html>)
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove both classes first to prevent conflicts
        root.classList.remove('light', 'dark');
        
        // Add current theme class
        root.classList.add(theme);

        // Save preference to local storage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};