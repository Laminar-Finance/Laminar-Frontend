import "../styles/globals.css";
import { WalletContextProvider } from "../context/WalletProvider";

function MyApp({ Component, pageProps }) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}

export default MyApp;
