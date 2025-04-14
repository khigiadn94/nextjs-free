"use client";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useState } from "react";

export type User = AccountResType["data"] | null;

const AppContext = createContext<{
  user: User;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  user: userProp,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const [user, setUser] = useState(userProp);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
