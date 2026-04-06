"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "client" | "manager" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<UserRole, User> = {
  client: {
    id: "u1",
    name: "Alex Thompson",
    email: "alex@acmecorp.com",
    role: "client",
    company: "Acme Corp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  manager: {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah@nexus.io",
    role: "manager",
    company: "Nexus Host",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  admin: {
    id: "u3",
    name: "Michael Ross",
    email: "michael@nexus.io",
    role: "admin",
    company: "Nexus Host",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin"); // Default to admin for easier demoing first
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Wait for cinematic loading
    return () => clearTimeout(timer);
  }, []);

  const setRole = (newRole: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setRoleState(newRole);
      setIsLoading(false);
    }, 800); // Smooth transition between roles
  };

  return (
    <AuthContext.Provider
      value={{
        user: MOCK_USERS[role],
        role,
        setRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
