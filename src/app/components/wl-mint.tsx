'use client';

import { useState, useEffect } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { simulateContract, writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core'
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';
import '@rainbow-me/rainbowkit/styles.css';
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import uwuAbi from '../../../UwuERC721AC.json'
import { parseEther } from "viem";
import { config } from '@/lib/config';
declare let window: any;


interface WlMintProps {
  ethPrice: number;
  maxSupply: number;
  maxMint: number;
  addresses: string[];
  UwUAddress: `0x${string}`;
  wlSupply: number | undefined;
  eligible: boolean
}
export default function WlMint({maxSupply, ethPrice, maxMint, addresses, UwUAddress, wlSupply, eligible}: WlMintProps) {
  const leafNodes = addresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
  const { connector, address } = useAccount();

  const [isPengu, setIsPengu] = useState(false);
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
    const endTime = new Date("2025-02-27T18:30:00Z").getTime(); // Set your target date here

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);

        if (distance < 0) {
            clearInterval(timer);
            setTimeLeft("ENDED");
        }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const wlMint = async () => { 
    if (!address || !connector || !window.ethereum) return;
    const hashedAddress = keccak256(address);
    const proof = merkleTree.getHexProof(hashedAddress);
    const quantity = BigInt(mintAmount);
    setLoading(true)
    const loadingToast = toast.loading("Processing your transaction...");

    try {
    // const simulation = await simulateContract(config, {
    //   abi: uwuAbi,
    //   address: UwUAddress,
    //   functionName: 'wlMint',
    //   args: [
    //     address,
    //     quantity,
    //     false,
    //     proof
    //   ],
    //   value: parseEther((ethPrice * mintAmount).toString()),
    // })
    // console.log(simulation)
      const hash = await writeContract(config, {
        abi: uwuAbi,
        address: UwUAddress,
        functionName: 'wlMint',
        args: [
          address,
          quantity,
          proof
        ],
        value: parseEther((ethPrice * mintAmount).toString()),
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
            <span className="text-sm">Max supply UwUList</span>
        </div>
        <p className="text-lg text-center">{maxSupply}</p>
        </div>
        
        <div>
        <div className="flex justify-center items-center gap-2">
            <span className="text-sm">Time Left</span>
        </div>
        <p className="text-lg text-center">{timeLeft}</p>
        </div>
    </div>

    <div className="space-y-4">
        <div className="flex justify-between items-center">
        <span>Mint Price:</span>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
            {/* <div className="relative flex items-center gap-2">
              <img  src="/eth-logo.png" className={`w-10 h-10 rounded-full bg-white p-1 border-2 cursor-pointer transition-opacity duration-200 ${!isPengu ? 'opacity-100 border-[#000]' : 'opacity-40 border-[#79CC9E] scale-75'} bg-[#79CC9E] border-4  shadow-[0_4px_0_#79CC9E] active:shadow-[0_0_0_#79CC9E] transition-all`}onClick={() => setIsPengu(false)}/>
              <Switch checked={isPengu} onCheckedChange={setIsPengu}className={`${isPengu ? 'bg-[#79CC9E]' : 'bg-[#79CC9E]'} data-[state=checked]:bg-[#79CC9E] data-[state=unchecked]:bg-[#79CC9E]`}/>
              <img  src="/pengu-logo.jpeg" className={`w-10 h-10 rounded-full bg-[#79CC9E] border-2 cursor-pointer transition-opacity duration-200 ${isPengu ? 'opacity-100 border-[#000] w-[110%]' : 'opacity-40 border-[#79CC9E]  scale-75'} border-4 shadow-[0_4px_0_#79CC9E] active:shadow-[0_0_0_#79CC9E]  transition-all`}onClick={() => setIsPengu(true)}/>
            </div> */}
            </div>
            <div className="text-right">
            <p className="text-xl">{ethPrice + ' Eth'}</p>
            <p className="text-sm text-gray-500">Total: {mintAmount *  ethPrice + ' Eth'}</p>
            </div>
        </div>
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
                <button disabled={loading || !eligible} onClick={wlMint} 
                  className={`rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                  transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                  active:shadow-[0_0_0_#000] active:translate-y-2 ${loading || !eligible ? 'opacity-50' : ''}`}>
                    Mint Now: {mintAmount *  ethPrice + ' Eth'}
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

