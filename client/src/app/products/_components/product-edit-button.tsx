"use client";
import { useAppContext } from "@/app/app-provider";
import DeleteProduct from "@/app/products/_components/delete-product";
import { Button } from "@/components/ui/button";
import { isClient } from "@/lib/http";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import React from "react";

export default function ProductEditButton({
  product,
}: {
  product: ProductListResType["data"][number];
}) {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) return null;
  return (
    <div className="flex space-x-2">
      <Link href={`/products/${product.id}/edit`}>
        <Button variant={"outline"}> Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </div>
  );
}
