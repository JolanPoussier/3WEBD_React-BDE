import React, { createContext, useContext, useState } from "react";
import rawData from "../data.json";
import { Data, User } from "../types";

const data = rawData as Data;

interface AuthContextValue {
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  users: User[];
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    data.utilisateurs[0] || null
  );
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, users: data.utilisateurs }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
