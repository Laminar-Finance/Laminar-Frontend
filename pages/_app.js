import "../styles/globals.css";
import { WalletContextProvider } from "../context/WalletProvider";
import { WalletConnectContextProvider } from "../context/WalletConnectProvider";

import { ChakraProvider } from "@chakra-ui/react";

import AuthenticatedRoute from "../components/AuthenticatedRoute";
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(router.asPath);

  const isKiosk = router.asPath.startsWith('/kiosk');

  return (
    <ChakraProvider>

      {isKiosk ? (
          <WalletConnectContextProvider>
            <Component {...pageProps} />
          </WalletConnectContextProvider>
      ) : (
        <WalletContextProvider>
        {Component.protected ? (
          <AuthenticatedRoute>
            <Component {...pageProps} />
          </AuthenticatedRoute>
        ) : (
          <Component {...pageProps} />
        )}
        </WalletContextProvider>
      )
      
      }
      
    </ChakraProvider>
  );
}

export default MyApp;
