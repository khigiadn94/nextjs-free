"use client";
import { isClient } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useState, useEffect } from "react";

export type User = AccountResType["data"] | null;

const AppContext = createContext<{
  user: User;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User>(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (isClient()) {
      const _user = localStorage.getItem("user");
      setUserState(_user ? JSON.parse(_user) : null);
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (isClient()) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
