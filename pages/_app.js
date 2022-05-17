import "../styles/globals.css";
import { WalletContextProvider } from "../context/WalletProvider";

import AuthenticatedRoute from "../components/AuthenticatedRoute";
import GenericLayout from "../layouts/GenericLayout";

function MyApp({ Component, pageProps }) {
  console.log(Component.protected);
  return (
    <WalletContextProvider>
      {Component.protected ? (
        <AuthenticatedRoute>
          <Component {...pageProps} />
        </AuthenticatedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </WalletContextProvider>
  );
}

export default MyApp;
