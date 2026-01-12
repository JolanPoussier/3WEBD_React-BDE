import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {
        primary: '#009FE3',
        primaryDark: '#007bb0',
        primaryLight: '#33b2e9',
        secondary: '#1e293b',
        background: '#f1f5f9',
        surface: '#ffffff',
        text: '#0f172a',
        textSoft: '#64748b',
        border: '#e2e8f0',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
    },
    transitions: {
        default: 'all 0.3s ease-in-out',
        fast: 'all 0.15s ease-in-out',
    },
    fonts: {
        body: '"Inter", "Roboto", sans-serif',
        heading: '"Outfit", "Inter", sans-serif',
    },
};
