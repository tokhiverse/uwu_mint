'use client';

import Image from "next/image";
import { createConfig, WagmiProvider } from 'wagmi';
import Mint from "./components/mint";
import Navbar from "./components/navbar";
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, abstract, abstractTestnet } from 'wagmi/chains';
import { metaMaskWallet, phantomWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { abstractWallet } from "@abstract-foundation/agw-react/connectors";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from "viem";
import { config } from "@/lib/config";
import Slider from "./components/slider";



// const config = getDefaultConfig({

//   appName: 'My RainbowKit App',
//   projectId: '8f5779a83c8dcba42a42ba629e899d3d',
//   chains: [mainnet, polygon, optimism, arbitrum, base, abstract],
//   ssr: true,
//   wallets: [
//     {
//       groupName: 'Recommended',
//       wallets: [metaMaskWallet, phantomWallet, abstractWallet],
//     },]
// });




export default function Home() {

  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen px-4 sm:px-14 bg-cover bg-center bg-[#0F2C23]">
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >
      <Navbar />
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-24">
      <div className="w-full sm:w-1/3">
        <Slider />
      </div>
      <div className="flex-1 relative my-auto mb-8">
        {/* <img src="/person.webp" className="absolute left-1/2 transform -translate-x-1/2 top-[-30px] w-[400px]"/> */}
        <Mint />
      </div>
      </div>
      
      </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
