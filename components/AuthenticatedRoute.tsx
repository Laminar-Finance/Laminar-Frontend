import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useWalletProvider } from "../context/WalletProvider";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
  redirectRoute: string | null;
};

const AuthenticatedRoute = ({
  children,
  redirectRoute,
}: AuthenticatedRouteProps) => {
  const { isConnected } = useWalletProvider();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);

  if (isConnected) {
    return <>{children}</>;
  }

  return null;
};

export default AuthenticatedRoute;
