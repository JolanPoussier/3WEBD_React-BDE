import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background:
      radial-gradient(900px 700px at 10% -10%, rgba(14, 165, 164, 0.18), transparent 60%),
      radial-gradient(800px 600px at 90% 10%, rgba(249, 115, 22, 0.2), transparent 55%),
      linear-gradient(180deg, ${({ theme }) => theme.colors.background} 0%, #fbf7f1 100%);
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
    transition: ${({ theme }) => theme.transitions.fast};
  }

  /* Page container */
  #app-root, .app-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
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

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Smooth scrollbar */
  ::-webkit-scrollbar { height: 10px; width: 10px; }
  ::-webkit-scrollbar-thumb { background: rgba(15, 23, 42, 0.2); border-radius: 8px; }

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
