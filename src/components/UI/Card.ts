import styled from "styled-components";

export const Card = styled.div`
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.surface} 0%,
    #fff1e1 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: fadeUp 420ms ease both;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-6px);
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  p {
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;
