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

  > * {
    animation-delay: 80ms;
  }
  > *:nth-child(2) {
    animation-delay: 140ms;
  }
  > *:nth-child(3) {
    animation-delay: 200ms;
  }
  > *:nth-child(4) {
    animation-delay: 260ms;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  > *:nth-child(1) {
    animation-delay: 180ms;
  }
  > *:nth-child(2) {
    animation-delay: 240ms;
  }
`;

const TopListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  > *:nth-child(1) {
    animation-delay: 260ms;
  }
  > *:nth-child(2) {
    animation-delay: 320ms;
  }
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

const FeaturedWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  flex-direction: column;
  gap: 0.35rem;
`;

const FeaturedIcon = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary}1a;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.35rem;
`;

const FeaturedName = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
`;

const FeaturedMeta = styled.span`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: 0.9rem;
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
                    <FeaturedWrap>
                        <FeaturedIcon>
                            <ShoppingCart size={28} />
                        </FeaturedIcon>
                        <FeaturedName>{stats.statistiques.produitPlusVendu.nom}</FeaturedName>
                        <FeaturedMeta>{stats.statistiques.produitPlusVendu.quantite} vendus</FeaturedMeta>
                    </FeaturedWrap>
                </Card>
            </TopListGrid>
        </div>
    );
};

export default Dashboard;
