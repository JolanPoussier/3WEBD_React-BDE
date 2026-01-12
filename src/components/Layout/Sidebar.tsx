import {
  CreditCard,
  History,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const SidebarContainer = styled.aside<{ isOpen?: boolean }>`
  width: 280px;
  background: linear-gradient(180deg, ${({ theme }) =>
    theme.colors.surface} 0%, #f1ebe3 100%);
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;

  @media (max-width: 900px) {
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
    transition: transform 220ms ease;
    width: 240px;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSoft};
  font-weight: 500;
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(14, 165, 164, 0.08);
    color: ${({ theme }) => theme.colors.secondary};
  }

  &.active {
    background: rgba(14, 165, 164, 0.18);
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 700;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { currentUser, setCurrentUser } = useAuth();
  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5a4" stopOpacity="1" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect width="36" height="36" rx="8" fill="url(#g1)" />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            fill="#1f2937"
            fontSize="12"
            fontWeight="700"
            fontFamily="Fraunces, Space Grotesk, serif"
          >
            BDE
          </text>
        </svg>
        <span style={{ marginLeft: 10 }}>SUPINFO BDE</span>
      </Logo>
      <NavList>
        <StyledNavLink to="/" end>
          <IconWrapper>
            <LayoutDashboard size={20} />
          </IconWrapper>
          Dashboard
        </StyledNavLink>
        <StyledNavLink to="/fidelity">
          <IconWrapper>
            <CreditCard size={20} />
          </IconWrapper>
          Fidélité
        </StyledNavLink>
        {currentUser?.estAdmin && (
          <StyledNavLink to="/users">
            <IconWrapper>
              <Users size={20} />
            </IconWrapper>
            Utilisateurs
          </StyledNavLink>
        )}
        <StyledNavLink to="/products">
          <IconWrapper>
            <Package size={20} />
          </IconWrapper>
          Produits
        </StyledNavLink>
        <StyledNavLink to="/orders">
          <IconWrapper>
            <History size={20} />
          </IconWrapper>
          Historique
        </StyledNavLink>
      </NavList>
      <div
        style={{
          marginTop: "auto",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(31, 41, 55, 0.08)",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          <input
            type="checkbox"
            checked={!!currentUser?.estAdmin}
            onChange={() =>
              currentUser &&
              setCurrentUser({
                ...currentUser,
                estAdmin: !currentUser.estAdmin,
              })
            }
          />
          Mode Admin
        </label>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
