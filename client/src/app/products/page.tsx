import productApiRequest from "@/apiRequests/product";
import DeleteProduct from "@/app/products/_components/delete-product";
import ProductAddButton from "@/app/products/_components/product-add-button";
import ProductEditButton from "@/app/products/_components/product-edit-button";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Product List",
  description: "Product list belong to Haluhak, create by Khigiadn94",
};

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  return (
    <div>
      <h1>Product List</h1>
      <ProductAddButton />

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
            <ProductEditButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
