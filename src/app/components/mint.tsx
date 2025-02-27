'use client';

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { simulateContract, writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core'
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';


import uwuAbi from '../../../UwuERC721AC.json'

import '@rainbow-me/rainbowkit/styles.css';
import OgMint from "./og-mint";
import { config } from "@/lib/config";
import WlMint from "./wl-mint";
import FcfsMint from "./fcfs-mint";
import { useAccount } from "wagmi";

const UwUAddress = "0xBa35962B23919f43cB70Df32e6dC59b159e141F0"

const ogAddresses = [
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAAb7feaA8b337BA8e87d06F4e62029E9BF0975Ee"
].map(addr => addr.toLowerCase());

const ogRoot = "0xbbf2ca95edf2ef666590500598c9c6a6bc702df481228e384e162de2fd678e68"

const wlAddresses = [
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAAb7feaA8b337BA8e87d06F4e62029E9BF0975Ee"
].map(addr => addr.toLowerCase());

const wlRoot = "0xbbf2ca95edf2ef666590500598c9c6a6bc702df481228e384e162de2fd678e68"

const fcfsAddresses = [
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAAb7feaA8b337BA8e87d06F4e62029E9BF0975Ee"
].map(addr => addr.toLowerCase());

const fcfsRoot = "0xbbf2ca95edf2ef666590500598c9c6a6bc702df481228e384e162de2fd678e68"


export default function Mint() {
  const maxSupplyOg = 150
  const maxSupplyWl = 1250
  const maxSupplyfcfs = 200
  const maxMintyOg = 3
  const maxMintWl = 2
  const maxMintfcfs = 2
  const ethPrice = 0.0069

  const { connector, address } = useAccount();
  const [ supply, setSupply ] = useState<number | undefined>()
  const [ ogSupply, setOgSupply ] = useState<number | undefined>()
  const [ wlSupply, setWLSupply ] = useState<number | undefined>()
  const [ fcfsSupply, setFcfsSupply ] = useState<number | undefined>()
  const [ currentPhase, setCurrentPhase ] = useState<'WL' | 'Public' | 'FCFS' | 'Closed'>('WL')

  const [ ogEligible, setOgEligible ] = useState<boolean>(false)
  const [ wlEligible, setWLEligible ] = useState<boolean>(false)
  const [ fcfsEligible, setFcfsEligible ] = useState<boolean>(false)

 
  useEffect(() => {
    getSupply()
    getSupplyOg()
    getSupplyWl()
    getSupplyFcfs()
  }, [])

  useEffect(() => {
    if(address){
      setOgEligible(checkEligibility(address, ogRoot,  ogAddresses))
      setWLEligible(checkEligibility(address, wlRoot, wlAddresses))
      setFcfsEligible(checkEligibility(address, fcfsRoot, fcfsAddresses))
    }
  }, [address, connector])

  const getSupply = async() => {
    const supply = await readContract(config, {
      abi: uwuAbi,
      address: UwUAddress,
      functionName: 'totalSupply',
    });
    setSupply(Number(supply))
  }

  const getSupplyOg = async() => {
    const supply = await readContract(config, {
      abi: uwuAbi,
      address: UwUAddress,
      functionName: 'ogMintedCount',
    });
    setOgSupply(Number(supply))
  }

  const getSupplyWl = async() => {
    const supply = await readContract(config, {
      abi: uwuAbi,
      address: UwUAddress,
      functionName: 'wlMintedCount',
    });
    setWLSupply(Number(supply))
  }

  const getSupplyFcfs = async() => {
    const supply = await readContract(config, {
      abi: uwuAbi,
      address: UwUAddress,
      functionName: 'fcfsMintedCount',
    });
    setFcfsSupply(Number(supply))
  }

  const checkEligibility = (address: string, merkleRoot: string, addresses: string[]) => {
    const leaves = addresses.map(addr => keccak256(addr));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(address);
    const proof = tree.getProof(leaf);
    return tree.verify(proof, leaf, merkleRoot);
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
              {
                ogSupply && (ogSupply >= maxSupplyOg) ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Sold out</span> :
                ogEligible ? <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Eligible</span> :
                <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
              }
            </TabsTrigger>
            <TabsTrigger value="wl" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              UwUlist
              {
                wlSupply && (wlSupply >= maxSupplyWl) ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Sold out</span> :
                address && wlEligible ? <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Eligible</span> :
                address && !wlEligible ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Not Eligible</span> :
                <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
              }
            </TabsTrigger>
            <TabsTrigger  value="fcfs" disabled className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              FCFS
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Closed</span>
            </TabsTrigger>
            <TabsTrigger value="public" disabled className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">Public Mint
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Closed</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="og" className="mt-4">
            <OgMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={maxSupplyOg} maxMint={maxMintWl} ogAddresses={ogAddresses} ogSupply={ogSupply}/>
          </TabsContent>
          
          <TabsContent value="wl" className="mt-4">
            <WlMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={maxSupplyWl} maxMint={maxMintWl} wlAddresses={wlAddresses} wlSupply={wlSupply}/>
          </TabsContent>
          
                    
          <TabsContent value="fcfs">
            <FcfsMint />
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


