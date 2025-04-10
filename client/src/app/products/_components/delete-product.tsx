"use client";

import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import productApiRequest from "@/apiRequests/product";
import { handleErrorApi } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteProduct({
  product,
}: {
  product: ProductResType["data"];
}) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => {
    setShowAlert(true);
  };

  const confirmDelete = () => {
    deleteProduct();
    setShowAlert(false);
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

  const deleteProduct = async () => {
    try {
      const result = await productApiRequest.delete(product.id);
      toast.success(`${result.payload.message}`);
      router.refresh();
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <>
      {showAlert ? (
        <Alert variant="destructive" className="w-full">
          <AlertTitle>Are you sure to Delete {product.name}?</AlertTitle>
          <AlertDescription>This action cannot be undone.</AlertDescription>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </Alert>
      ) : (
        <Button variant="destructive" className="w-full" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </>
  );
}
