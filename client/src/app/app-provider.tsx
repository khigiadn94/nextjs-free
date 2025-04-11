"use client";
import { clientSessionToken } from "@/lib/http";
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

export const userAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppProvider({
  children,
  inititalSessionToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
  user: User;
}) {
  const [user, setUser] = useState(userProp);
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
    }
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
