
import Image from "next/image";
import { createConfig, WagmiProvider } from 'wagmi';
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, abstract, abstractTestnet } from 'wagmi/chains';
import { metaMaskWallet, phantomWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { abstractWallet } from "@abstract-foundation/agw-react/connectors";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from "viem";


const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [abstractWallet, metaMaskWallet, phantomWallet],
    },
  ],
  {
    appName: "Rainbowkit Test",
    projectId: "8f5779a83c8dcba42a42ba629e899d3d",
    appDescription: "",
    appIcon: "",
    appUrl: "",
  }
);


export const config = createConfig({
  connectors,
  chains: [abstract],
  transports: {
    [abstract.id]: http(),
  },
  ssr: true,
});
