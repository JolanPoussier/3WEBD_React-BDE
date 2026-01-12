import { Gift, ShoppingBag, Star } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/UI/Button";
import { Card, PageHeader } from "../components/UI/Card";
import rawData from "../data.json";
import { Data } from "../types";

const data = rawData as Data;

const LoyaltyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const StampsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface StampProps {
  active?: boolean;
}

const Stamp = styled.div<StampProps>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px dashed
    ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, active }) =>
    active ? theme.colors.primary + "10" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;

  svg {
    color: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.border};
    opacity: ${({ active }) => (active ? 1 : 0.5)};
  }

  ${({ active, theme }) =>
    active &&
    `
    border-style: solid;
    box-shadow: 0 0 15px ${theme.colors.primary}40;
    transform: scale(1.05);
  `}
`;

const RewardText = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.success + "15"};
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

const Loyalty: React.FC = () => {
  const navigate = useNavigate();
  // Simulate current user (first user in data)
  const initialUser = data.utilisateurs[0];
  const totalStamps = data.carteFidelite.nombreTampons;
  const reward = data.carteFidelite.recompense;

  const [userPoints, setUserPoints] = useState<number>(initialUser.points || 0);
  const [message, setMessage] = useState<string | null>(null);

  const addStamp = () => {
    setMessage(null);
    setUserPoints((p) => Math.min(totalStamps, p + 1));
  };

  const removeStamp = () => {
    setMessage(null);
    setUserPoints((p) => Math.max(0, p - 1));
  };

  const toggleStamp = (index: number) => {
    // clicking stamp sets points to index+1 (if higher) or removes following stamps
    setMessage(null);
    setUserPoints((p) => (index < p ? index + 1 : index + 1));
  };

  const redeem = () => {
    if (userPoints >= totalStamps) {
      setMessage(`Félicitations ! Vous gagnez : ${reward}`);
      setUserPoints(0);
    } else {
      setMessage("Carte incomplète : pas assez de tampons pour échanger.");
    }
  };

  return (
    <div>
      <PageHeader>
        <h1>Carte de Fidélité</h1>
        <p>Cumulez des tampons et gagnez des récompenses !</p>
      </PageHeader>

      <LoyaltyContainer>
        <Card style={{ width: "100%", padding: "2rem", textAlign: "center" }}>
          <h2>Bonjour, {initialUser.nomComplet.split(" ")[1]} !</h2>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Vous avez actuellement <strong>{userPoints}</strong> tampon
            {userPoints > 1 ? "s" : ""}.
          </p>

          <StampsGrid>
            {[...Array(totalStamps)].map((_, index) => (
              <Stamp
                key={index}
                active={index < userPoints}
                onClick={() => toggleStamp(index)}
                role="button"
                aria-label={`Tampon ${index + 1}`}
                style={{ cursor: "pointer" }}
              >
                <Star
                  size={32}
                  fill={index < userPoints ? "currentColor" : "none"}
                />
              </Stamp>
            ))}
          </StampsGrid>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Button onClick={addStamp}>Ajouter tampon</Button>
            <Button variant="outline" onClick={removeStamp}>
              Retirer tampon
            </Button>
            <Button variant="primary" onClick={redeem}>
              Échanger la carte
            </Button>
          </div>

          {message && (
            <RewardText style={{ marginBottom: "1rem" }}>
              <Gift size={20} /> {message}
            </RewardText>
          )}

          <RewardText>
            <Gift size={20} /> {reward}
          </RewardText>

          <Button onClick={() => navigate("/products")}>
            <ShoppingBag size={20} /> Aller à la boutique
          </Button>
        </Card>
      </LoyaltyContainer>
    </div>
  );
};

export default Loyalty;
