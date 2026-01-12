import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const Select = styled.select`
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const UserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useAuth();

  return (
    <Select
      value={currentUser?.id || ""}
      onChange={(e) => {
        const id = parseInt(e.target.value);
        const u = users.find((x) => x.id === id) || null;
        setCurrentUser(u);
      }}
    >
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.nomComplet} {u.estAdmin ? "(admin)" : ""}
        </option>
      ))}
    </Select>
  );
};

export default UserSelector;
