import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { Card } from '../UI/Card';
import { PaymentDistribution } from '../../types';

const ChartTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

interface PaymentChartProps {
    data: PaymentDistribution[];
}

const PaymentChart: React.FC<PaymentChartProps> = ({ data }) => {
    const theme = useTheme();

    // Custom colors for the pie slices
    const COLORS = [theme.colors.primary, theme.colors.info, theme.colors.warning];

    return (
        <Card>
            <ChartTitle>Répartition des Paiements</ChartTitle>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="pourcentage"
                            nameKey="type"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.colors.surface,
                                border: `1px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                boxShadow: theme.shadows.md
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default PaymentChart;
