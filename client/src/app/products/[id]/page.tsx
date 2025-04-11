import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import React from "react";

export default async function ProductDetail({
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
      <>
        {!product && <div>No Product Found!</div>}
        {product && (
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="w-32 h-32 object-cover "
            />

            <h3>{product.name}</h3>
            <div>{product.price}</div>
          </div>
        )}
      </>
    </div>
  );
}
