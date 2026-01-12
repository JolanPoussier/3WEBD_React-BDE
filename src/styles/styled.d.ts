import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryDark: string;
            primaryLight: string;
            secondary: string;
            background: string;
            surface: string;
            text: string;
            textSoft: string;
            border: string;
            success: string;
            danger: string;
            warning: string;
            info: string;
        };
        shadows: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        borderRadius: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            full: string;
        };
        transitions: {
            default: string;
            fast: string;
        };
        fonts: {
            body: string;
            heading: string;
        };
    }
}
