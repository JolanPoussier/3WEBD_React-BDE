import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textSoft};
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: ${({ theme }) => theme.colors.background}50;
  }
`;

interface ActionButtonProps {
    color?: string;
}

export const ActionButton = styled.button<ActionButtonProps>`
  background: none;
  border: none;
  color: ${({ theme, color }) => color || theme.colors.textSoft};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, color }) => (color || theme.colors.textSoft) + '15'};
    color: ${({ theme, color }) => color || theme.colors.primary};
  }
`;

interface BadgeProps {
    variant?: 'success' | 'danger' | 'default';
}

export const Badge = styled.span<BadgeProps>`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme, variant }) =>
        variant === 'success' ? theme.colors.success + '20' :
            variant === 'danger' ? theme.colors.danger + '20' :
                theme.colors.textSoft + '20'};
  color: ${({ theme, variant }) =>
        variant === 'success' ? theme.colors.success :
            variant === 'danger' ? theme.colors.danger :
                theme.colors.textSoft};
`;
