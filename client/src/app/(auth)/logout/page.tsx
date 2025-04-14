"use client";

import authApiRequest from "@/apiRequests/auth";
import { MessageResType } from "@/schemaValidations/common.schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type LogoutResponse = {
  status: number;
  payload: MessageResType;
};

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === localStorage.getItem("sessionToken")) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then((res: LogoutResponse) => {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("sessionTokenExpiresAt");
          router.push(`/login?redirectFrom=${pathname}`);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathname]);
  return <div>page</div>;
}

export default function Logout() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
