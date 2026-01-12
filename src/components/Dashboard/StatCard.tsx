import React from 'react';
import styled from 'styled-components';
import { Card } from '../UI/Card';
import { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
    color?: string;
}

const IconWrapper = styled.div<IconWrapperProps>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, color }) => color ? `${color}15` : theme.colors.primary + '15'};
  color: ${({ theme, color }) => color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme, color }) => color ? `${color}33` : theme.colors.primary + '33'};
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 0.875rem;
`;

interface StatCardProps {
    icon?: LucideIcon;
    label: string;
    value: string | number;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
    return (
        <Card>
            {Icon && <IconWrapper color={color}><Icon size={24} /></IconWrapper>}
            <Value>{value}</Value>
            <Label>{label}</Label>
        </Card>
    );
};

export default StatCard;
