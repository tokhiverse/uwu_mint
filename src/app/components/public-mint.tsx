'use client';

import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { simulateContract, writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core'

import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useSimulateContract } from 'wagmi';
import { toast } from 'react-toastify';


import '@rainbow-me/rainbowkit/styles.css';
import uwuAbi from '../../../UwuERC721AC.json'
import { parseEther } from "viem";
import { config } from '@/lib/config';
declare let window: any;



interface WlMintProps {
  ethPrice: number;
  maxSupply: number;
  maxMint: number;
  UwUAddress: `0x${string}`;
  publicSupply: number | undefined;
  eligible: boolean
}
export default function PublicMint({maxSupply, ethPrice, maxMint, UwUAddress, publicSupply, eligible}: WlMintProps) {
  const { connector, address } = useAccount();
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [mintAmount, setMintAmount] = useState(1);
  const [loading, setLoading] = useState(false)

  const handleIncrement = () => {
    if (mintAmount < maxMint) setMintAmount(prev => prev + 1)
  };

  const handleDecrement = () => {
    if (mintAmount > 1) setMintAmount(prev => prev - 1)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      // Clamp the value between 1 and 3
      const clampedValue = Math.min(Math.max(value, 1), 3);
      setMintAmount(clampedValue);
    }
  };

  useEffect(() => {
    const endTime = new Date("2025-02-27T23:00:00Z").getTime(); // Set your target date here

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Adjusting to UTC time for consistent display
        const utcHours = (hours + 24) % 24; // Ensure hours are in 0-23 range
        setTimeLeft(`${utcHours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);

        if (distance < 0) {
            clearInterval(timer);
            setTimeLeft("ENDED");
        }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const publicMint = async () => { 
    if (!address || !connector || !window.ethereum) return;
    const quantity = BigInt(mintAmount);
    setLoading(true)
    const loadingToast = toast.loading("Processing your transaction...");

    try {
      const hash = await writeContract(config, {
        abi: uwuAbi,
        address: UwUAddress,
        functionName: 'publicMint',
        args: [
          address,
          quantity,
        ],
        // value: 0,
      });
      const receipt = await waitForTransactionReceipt(config, { hash });
      setLoading(false)
      toast.dismiss(loadingToast)
      toast.success("Minting successful!");
    } catch (error) {
      console.error("Mint error:", error);
      setLoading(false)
      toast.dismiss(loadingToast)
      toast.error("Minting failed. Please try again.");
    }
  }
  return (
  <>
    <div className="grid grid-cols-3 gap-8 mb-6">
        <div>
        <div className="flex justify-center items-center gap-2">
            <span className="text-sm">Limit per wallet</span>
        </div>
        <p className="text-lg text-center">{maxMint}</p>
        </div>
        
        <div>
        <div className="flex justify-center items-center gap-2">
            <span className="text-sm">Max supply Public</span>
        </div>
          <p className="text-lg text-center">{maxSupply}</p>
        </div>
        
        <div>
        <div className="flex justify-center items-center gap-2">
            <span className="text-sm">Time to Start</span>
        </div>
        <p className="text-lg text-center">{timeLeft}</p>
        </div>
    </div>

    <div className="space-y-4">
        <div className="flex justify-between items-center">
        <span>Quantity</span>
        </div>
        
        <div className="flex items-center border-2 border-gray-700 rounded-full">
        <button  onClick={handleDecrement} className="px-4 py-2 text-xl hover:text-[#79CC9E] transition-colors">-</button>
        <input type="number" value={mintAmount} onChange={handleInputChange} min={1} max={3} className="w-full text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  />
        <button  onClick={handleIncrement} className="px-4 py-2 text-xl hover:text-[#79CC9E] transition-colors">+</button>
        </div>
    </div>



    {/* Mint Btn */}

    <div className="flex justify-center">
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
                <button 
                    disabled={loading || !eligible} 
                    onClick={publicMint} 
                    className={`rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                    transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                    active:shadow-[0_0_0_#000] active:translate-y-2 ${loading || !eligible ? 'opacity-50' : ''}`}>
                    Mint Now
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
      </div>
  </>
  )
}

