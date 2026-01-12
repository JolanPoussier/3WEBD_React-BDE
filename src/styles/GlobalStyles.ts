import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 700;
  }

  button {
    font-family: ${({ theme }) => theme.fonts.body};
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Responsive typography */
  @media (max-width: 900px) {
    h1 { font-size: 1.25rem; }
    h2 { font-size: 1rem; }
    body { font-size: 14px; }
  }
  @media (min-width: 901px) {
    body { font-size: 15px; }
  }
`;
