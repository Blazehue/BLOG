import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check against stored users
    const usersData = localStorage.getItem("users");
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find((u) => u.email === email);
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // In a real app, verify password hash
    // For demo purposes, we'll just log in
    setUser(foundUser);
    
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      sessionStorage.setItem("user", JSON.stringify(foundUser));
    }
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if username or email already exists
    const usersData = localStorage.getItem("users");
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    if (users.some((u) => u.email === data.email)) {
      throw new Error("Email already exists");
    }

    if (users.some((u) => u.username === data.username)) {
      throw new Error("Username already taken");
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      createdAt: new Date().toISOString(),
    };

    // Save to "database"
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update in users list
    const usersData = localStorage.getItem("users");
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
