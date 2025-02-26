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
    <div className="min-h-screen px-14 bg-cover bg-center bg-[#0F2C23]">
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >
      <Navbar />
      <div className="flex gap-24">
      <div className="w-1/3">
          <div className="aspect-square bg-[#FF6B6B] overflow-hidden border-4 border-[#000] rounded-[50px] shadow-[0_4px_0_#000] mb-4">
            <img  src="/1.1.png" alt="Main NFT preview" className="w-full h-full object-contain"/>
          </div>
          <div className="h-[2px] bg-gradient-to-r mb-4 from-[#fff]/0 via-[#fff] to-[#fff]/0"></div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-white overflow-hidden rounded-3xl cursor-pointer border-2 border-[#000] shadow-[0_2px_0_#000]">
                <img src={`/${i}.png`} alt={`NFT preview ${i}`} className="w-full h-full object-contain "/>
              </div>
            ))}
          </div>
      </div>
      <div className="flex-1 relative">
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
