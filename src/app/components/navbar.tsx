'use client';

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { abstractWallet } from "@abstract-foundation/agw-react/connectors";

import { useAccount, useConnect, useDisconnect } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';



import '@rainbow-me/rainbowkit/styles.css';

export default function Navbar() {


  return (
    <div className="mb-8 flex justify-between items-center">
        <img src="/uwulogo.jpg" alt="Uwu_Logo" className="w-12 h-12 rounded-xl" />
        {/* <button className="rounded-[100px] text-sm py-3 px-6 bg-[#0F2C23] text-white border-4 border-[#000] shadow-[0_4px_0_#000] 
        transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
        active:shadow-[0_0_0_#000] active:translate-y-2">
        Connect your Wallet
        </button> */}
        <ConnectBtn />
    </div>
  )
}




// import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectBtn = () => {
    const { disconnect } = useDisconnect();

  return (
    <ConnectButton.Custom>{({ account, chain, openAccountModal, openChainModal, openConnectModal,authenticationStatus, mounted,}) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');


        return (
          <div 
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className="rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                  transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                  active:shadow-[0_0_0_#000] active:translate-y-2" onClick={openConnectModal} type="button">
                    Connect your Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button className="rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                  transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                  active:shadow-[0_0_0_#000] active:translate-y-2" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <button onClick={() => disconnect()} className="rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                active:shadow-[0_0_0_#000] active:translate-y-2">
                    Disconnect: {account.displayName}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};