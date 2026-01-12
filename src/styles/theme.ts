import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#0ea5a4",
    primaryDark: "#0f766e",
    primaryLight: "#5eead4",
    secondary: "#1f2937",
    background: "#f6f2ea",
    surface: "#fff8ef",
    text: "#1f2937",
    textSoft: "#6b7280",
    border: "#eadfce",
    success: "#16a34a",
    danger: "#e11d48",
    warning: "#f97316",
    info: "#2563eb",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(15 23 42 / 0.06)",
    md: "0 10px 30px -18px rgb(15 23 42 / 0.35)",
    lg: "0 20px 40px -20px rgb(15 23 42 / 0.35)",
    xl: "0 30px 60px -28px rgb(15 23 42 / 0.4)",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  transitions: {
    default: "all 0.3s ease-in-out",
    fast: "all 0.15s ease-in-out",
  },
  fonts: {
    body: '"Manrope", "Segoe UI", sans-serif',
    heading: '"Manrope", "Segoe UI", sans-serif',
  },
};
