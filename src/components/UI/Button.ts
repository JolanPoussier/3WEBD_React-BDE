import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "outline" | "danger";
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  background: ${({ variant, theme }) =>
    variant === "outline"
      ? "transparent"
      : variant === "danger"
      ? `linear-gradient(180deg, ${theme.colors.danger}, ${theme.colors.danger})`
      : `linear-gradient(180deg, ${theme.colors.primary}, ${theme.colors.primaryDark})`};
  color: ${({ variant, theme }) =>
    variant === "outline" ? theme.colors.primary : "#ffffff"};
  border: ${({ variant, theme }) =>
    variant === "outline" ? `2px solid ${theme.colors.primary}` : "none"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    opacity: 0.96;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
