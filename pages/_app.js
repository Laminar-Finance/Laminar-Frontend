import "../styles/globals.css";
import { WalletContextProvider } from "../context/WalletProvider";

import AuthenticatedRoute from "../components/AuthenticatedRoute";

function MyApp({ Component, pageProps }) {
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
