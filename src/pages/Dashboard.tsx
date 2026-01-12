import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingBag, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import SalesChart from '../components/Dashboard/SalesChart';
import PaymentChart from '../components/Dashboard/PaymentChart';
import { PageHeader, Card } from '../components/UI/Card';
import rawData from '../data.json';
import { Data } from '../types';

const data = rawData as Data;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const TopListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TopList = styled.div`
  margin-top: 1rem;
`;

const TopItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<Data | null>(null);

    useEffect(() => {
        // Simulate loading
        setStats(data);
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div>
            <PageHeader>
                <h1>Dashboard</h1>
                <p>Vue d'ensemble des activités du BDE</p>
            </PageHeader>

            <Grid>
                <StatCard
                    icon={DollarSign}
                    label="Total Ventes"
                    value={`${stats.statistiques.totalVentes}€`}
                    color="#10b981"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Bénéfice"
                    value={`${stats.statistiques.benefice}€`}
                    color="#3b82f6"
                />
                <StatCard
                    icon={Users}
                    label="Clients"
                    value={stats.statistiques.nombreClients}
                    color="#f59e0b"
                />
                <StatCard
                    icon={ShoppingBag}
                    label="Commandes"
                    value={stats.statistiques.nombreCommandes}
                    color="#8b5cf6"
                />
            </Grid>

            <ChartsGrid>
                <SalesChart data={stats.ventesParMois} />
                <PaymentChart data={stats.repartitionPaiements} />
            </ChartsGrid>

            <TopListGrid>
                <Card>
                    <h3>Top Clients (Commandes)</h3>
                    <TopList>
                        {stats.topClients.parCommandes.map((client, index) => (
                            <TopItem key={index}>
                                <span>{client.nom}</span>
                                <b>{client.nombreCommandes}</b>
                            </TopItem>
                        ))}
                    </TopList>
                </Card>
                <Card>
                    <h3>Produit Star</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', flexDirection: 'column' }}>
                        <ShoppingCart size={48} color="#009FE3" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ color: '#1e293b' }}>{stats.statistiques.produitPlusVendu.nom}</h2>
                        <span style={{ color: '#64748b' }}>{stats.statistiques.produitPlusVendu.quantite} vendus</span>
                    </div>
                </Card>
            </TopListGrid>
        </div>
    );
};

export default Dashboard;
