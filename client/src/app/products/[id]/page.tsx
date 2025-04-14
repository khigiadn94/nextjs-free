import productApiRequest from "@/apiRequests/product";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import envConfig from "@/config";
import { baseOpenGraph } from "@/app/shared-metadata";

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;
  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + product.id;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url,
      images: [
        {
          url: product.image,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail(props: Props) {
  const params = await props.params;
  let product = null;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}

  return (
    <main className="container mx-auto px-4 py-8">
      {!product && (
        <div className="text-center text-2xl text-gray-600">
          No Product Found!
        </div>
      )}
      {product && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="text-2xl font-semibold text-blue-600">
              ${product.price.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
