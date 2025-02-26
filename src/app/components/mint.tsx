'use client';

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { simulateContract, writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core'

import uwuAbi from '../../../UwuERC721AC.json'

import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import OgMint from "./og-mint";
import MintBtn from "./mintBtn";
import { config } from "@/lib/config";
import WlMint from "./wl-mint";

const UwUAddress = "0xBa35962B23919f43cB70Df32e6dC59b159e141F0"
export default function Mint() {

  
  const [ supply, setSupply ] = useState<number | undefined>()

 
  useEffect(() => {
    getSupply()
  }, [])

  const getSupply = async() => {
    console.log('supply')
    const supply = await readContract(config, {
      abi: uwuAbi,
      address: UwUAddress,
      functionName: 'totalSupply',
      // args: [address, UwUAddress],
    });
    // console.log(Number(supply))
    setSupply(Number(supply))
  }

  return (
    <div className="absolute p-8 py-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full bg-[#F8FFE8] border-4 border-[#000] rounded-[100px] shadow-[0_4px_0_#000]">

      <h1 className="text-center text-4xl">Mint your UwU</h1>
      
      <div className="mt-8 space-y-4">
        {/* <h2 className="text-2xl font-bold">Total Supply</h2> */}
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-l">{supply && Math.round((supply / 2000 * 100) * 100) / 100 }% Minted</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span className="text-l">{supply}/2000</span>
          </div>
          
          <Progress value={(supply ? supply / 2000 * 100 : 0)} className="h-3 border-2 border-black" />
        </div>
      </div>

      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold mb-4">Mint Groups</h2> */}
        
        <Tabs defaultValue="og" className="w-full">
          <TabsList className="w-full bg-transparent py-8 relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0F2C23]/0 via-[#79CC9E] to-[#0F2C23]/0"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0F2C23]/0 via-[#79CC9E] to-[#0F2C23]/0"></div>
            <TabsTrigger value="og" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              OG
              <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
            </TabsTrigger>
            <TabsTrigger value="wl" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              UwUlist
              <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
            </TabsTrigger>
            <TabsTrigger value="fcfs" disabled className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              FCFS
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Closed</span>
            </TabsTrigger>
            <TabsTrigger value="public" disabled className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">Public Mint
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Closed</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="og" className="mt-4">
            <OgMint />
          </TabsContent>
          
          <TabsContent value="wl">
            <WlMint />
          </TabsContent>
          
                    
          <TabsContent value="fcfs">
            {/* <WlMint /> */}
          </TabsContent>

          <TabsContent value="public">
            {/* Similar content structure for Public */}
          </TabsContent>
        </Tabs>
      </div>

      {/* <div className="flex justify-center">
        <ConnectBtn />
      </div> */}
      
      
    

    </div>
  )
}


