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

const SidebarContainer = styled.aside<{ isOpen?: boolean }>`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
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

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary}15;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
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
  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>SUPINFO BDE</Logo>
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
        <StyledNavLink to="/users">
          <IconWrapper>
            <Users size={20} />
          </IconWrapper>
          Utilisateurs
        </StyledNavLink>
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
    </SidebarContainer>
  );
};

export default Sidebar;
