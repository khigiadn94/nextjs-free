"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useState } from "react";

export type User = AccountResType["data"] | null;

export default function AppProvider({
  children,
  inititalSessionToken = "",
  user,
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
  user: User;
}) {
  console.log(user);
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
    }
  });

  return <>{children}</>;
}
