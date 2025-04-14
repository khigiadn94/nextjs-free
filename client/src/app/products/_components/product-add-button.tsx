"use client";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/app/app-provider";
import Link from "next/link";
import React from "react";

export default function ProductAddButton() {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) return null;

  return (
    <Link href={"/products/add"}>
      <Button variant={"secondary"} aria-label="Add new product">
        Add Product
      </Button>
    </Link>
  );
}
