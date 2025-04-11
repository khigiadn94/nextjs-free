import productApiRequest from "@/apiRequests/product";
import DeleteProduct from "@/app/products/_components/delete-product";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductListPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const isAuthenticated = Boolean(sessionToken);
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div>
      <h1>Product List</h1>
      {isAuthenticated && (
        <Link href={"/products/add"}>
          <Button variant={"secondary"}>Add Product</Button>
        </Link>
      )}

      <div className="space-y-4">
        {productList.map((product, index) => (
          <div key={product.id} className="flex space-x-4">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={180}
                className="w-32 h-32 object-cover "
                priority={index === 0}
              />
            </Link>

            <h3>{product.name}</h3>
            <div>{product.price}</div>
            {isAuthenticated && (
              <div className="flex space-x-2">
                <Link href={`/products/${product.id}/edit`}>
                  <Button variant={"outline"}> Edit</Button>
                </Link>
                <DeleteProduct product={product} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
