import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import React, { cache } from "react";
import type { Metadata, ResolvingMetadata } from "next";

const getDetaiPage = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;
  const { payload } = await getDetaiPage(Number(id));
  const product = payload.data;

  return {
    title: `Edit product: ${product.name}`,
    description: `Description: ${product.description}`,
    openGraph: {
      title: product.name,
      description: `Description: ${product.name}`,
      images: [
        {
          url: product.image,
          width: 400,
          height: 400,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductEdit({ params, searchParams }: Props) {
  const resolvedParams = await params;
  let product = null;
  try {
    const { payload } = await getDetaiPage(Number(resolvedParams.id));
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>No Product Found!</div>}
      {product && <ProductAddForm product={product} />}
    </div>
  );
}
