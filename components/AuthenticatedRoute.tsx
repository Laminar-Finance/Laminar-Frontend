import { useRouter } from "next/router";
import React from "react";
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

  if (typeof window === "undefined") {
    return children;
  }

  if (!isConnected) {
    router.push(redirectRoute || "/");
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
