import "../styles/globals.css";
import { useEffect } from "react";
// BEGIN Web3Modal_config
import { EthereumClient } from "@web3modal/ethereum";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { mainnet } from "wagmi/chains";
import {
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

const WAGMI_APP_NAME = "ThomasApolloTest";
if (!process.env.NEXT_PUBLIC_YOUR_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_YOUR_PROJECT_ID;
const chains = [ mainnet ];

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY}),
]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      coinbaseWallet({ appName: WAGMI_APP_NAME, chains }),
      phantomWallet({ chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }) {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default MyApp;
