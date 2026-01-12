import styled from 'styled-components';

interface ButtonProps {
    variant?: 'primary' | 'outline' | 'danger';
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ variant, theme }) =>
        variant === 'outline' ? 'transparent' :
            variant === 'danger' ? theme.colors.danger :
                theme.colors.primary};
  color: ${({ variant, theme }) =>
        variant === 'outline' ? theme.colors.primary : '#fff'};
  border: ${({ variant, theme }) =>
        variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background-color: ${({ variant, theme }) =>
        variant === 'outline' ? theme.colors.primary + '10' :
            variant === 'danger' ? theme.colors.danger + 'dd' :
                theme.colors.primaryDark};
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
