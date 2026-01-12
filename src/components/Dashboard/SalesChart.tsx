import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { Card } from '../UI/Card';
import { MonthlySale } from '../../types';

const ChartTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

interface SalesChartProps {
    data: MonthlySale[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    const theme = useTheme();

    return (
        <Card>
            <ChartTitle>Ventes par Mois</ChartTitle>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.border} />
                        <XAxis
                            dataKey="mois"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.colors.textSoft, fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.colors.textSoft, fontSize: 12 }}
                            tickFormatter={(value: number) => `${value}€`}
                        />
                        <Tooltip
                            cursor={{ fill: theme.colors.background }}
                            contentStyle={{
                                backgroundColor: theme.colors.surface,
                                border: `1px solid ${theme.colors.border}`,
                                borderRadius: theme.borderRadius.md,
                                boxShadow: theme.shadows.md
                            }}
                        />
                        <Bar
                            dataKey="montant"
                            fill={theme.colors.primary}
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default SalesChart;
