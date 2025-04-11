import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import React from "react";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(
      Number(resolvedParams.id)
    );
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>No Product Found!</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
