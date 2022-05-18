import "../styles/globals.css";
import { WalletContextProvider } from "../context/WalletProvider";
import { ChakraProvider } from "@chakra-ui/react";

import AuthenticatedRoute from "../components/AuthenticatedRoute";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        {Component.protected ? (
          <AuthenticatedRoute>
            <Component {...pageProps} />
          </AuthenticatedRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </WalletContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
