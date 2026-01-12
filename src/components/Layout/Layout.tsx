import { Menu } from "lucide-react";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import UserSelector from "./UserSelector";

const TopBar = styled.header`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: 900px) {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1200;
  }
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  margin-left: 280px;
  padding: 2.5rem;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  animation: fadeUp 420ms ease both;

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 1rem;
    padding-top: 0.5rem;
  }
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopBar>
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setSidebarOpen((s) => !s)}
          style={{
            background: "none",
            border: "none",
            padding: 8,
            cursor: "pointer",
          }}
        >
          <Menu size={20} />
        </button>
        <div style={{ fontWeight: 700 }}>
          {/* espace pour logo si besoin */}
        </div>
        <div>
          {/* User selector for testing roles */}
          <UserSelector />
        </div>
      </TopBar>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MainContent
        sidebarOpen={sidebarOpen}
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {children}
      </MainContent>
    </>
  );
};

export default Layout;
