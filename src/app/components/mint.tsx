'use client';

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"
import { simulateContract, writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core'
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import {LockKeyhole, LockKeyholeOpen} from 'lucide-react'

import uwuAbi from '../../../UwuERC721AC.json'

import '@rainbow-me/rainbowkit/styles.css';
import OgMint from "./og-mint";
import { config } from "@/lib/config";
import WlMint from "./wl-mint";
import FcfsMint from "./fcfs-mint";
import { useAccount } from "wagmi";
import PublicMint from "./public-mint";
import { ogAddresses } from "@/lib/ogaddresses";
import { wlAddresses } from "@/lib/wlsaddresses";
import { fcfsAddresses } from "@/lib/fcfsaddresses";


const UwUAddress = "0x94f6791eAd2E9690f142BD9Df4D2677382edAB0E"

const ogRoot = "0x144332943a86bba283072f9281aa928719100405c0f03f066a0209fa63482b3c"
const wlRoot = "0xf2f5f05db786f0333029de35bc77300774bc48b223176069abfd2d98d463f751"
const fcfsRoot = "0x83450d3acafc3bf0a9e13e9cec4d2dc79286ed7e659c3a4ee591cfda08967765"


export default function Mint() {
  const maxSupplyOg = 150
  const maxSupplyWl = 1250
  const maxSupplyFcfs = 200
  const maxMintOg = 3
  const maxMintWl = 2
  const maxMintfcfs = 2
  const maxMintPublic = 10
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
              {/* <span className="shrink-0 size-2 relative flex items-center justify-center mr-2" >
                <span className="absolute size-2.5 rounded-full bg-[#79CC9E] animate-ping"></span>
                <span className="relative block size-2 bg-[#79CC9E] rounded-full"></span>
              </span> */}
              OG
              
              {
                ogSupply && (ogSupply >= maxSupplyOg) ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Sold out</span> :
                ogEligible ? <><LockKeyholeOpen size={20} className="ml-2 text-[#79CC9E]"/><span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Eligible</span></> :
                address && !ogEligible ? <><LockKeyhole size={20} className="ml-2 text-gray-500"/><span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Not Eligible</span></> :
                <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
              }
            </TabsTrigger>
            <TabsTrigger value="wl" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              {/* <span className="shrink-0 size-2 relative flex items-center justify-center mr-2" >
                <span className="absolute size-2.5 rounded-full bg-[#79CC9E] animate-ping"></span>
                <span className="relative block size-2 bg-[#79CC9E] rounded-full"></span>
              </span> */}
              UwUlist
              {
                wlSupply && (wlSupply >= maxSupplyWl) ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Sold out</span> :
                address && wlEligible ? <><LockKeyholeOpen size={20} className="ml-2 text-[#79CC9E]"/><span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Eligible</span></> :
                address && !wlEligible ? <><LockKeyhole size={20} className="ml-2 text-gray-500"/><span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Not Eligible</span></> :
                <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
              }
            </TabsTrigger>
            <TabsTrigger value="fcfs" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">
              FCFS
              {
                fcfsSupply && (fcfsSupply >= maxSupplyFcfs) ? <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Sold out</span> :
                address && fcfsEligible ? <><LockKeyholeOpen size={20} className="ml-2 text-[#79CC9E]"/><span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Eligible</span></> :
                address && !fcfsEligible ? <><LockKeyhole size={20} className="ml-2 text-gray-500"/><span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Not Eligible</span></> :
                <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
              }
            </TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">Public Mint
              <LockKeyhole size={20} className="ml-2"/>
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Eligible</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="og" className="mt-4">
            <OgMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={maxSupplyOg} maxMint={maxMintOg} ogAddresses={ogAddresses} ogSupply={ogSupply} eligible={ogEligible}/>
          </TabsContent>
          
          <TabsContent value="wl" className="mt-4">
            <WlMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={maxSupplyWl} maxMint={maxMintWl} wlAddresses={wlAddresses} wlSupply={wlSupply} eligible={wlEligible}/>
          </TabsContent>
          
                    
          <TabsContent value="fcfs" className="mt-4">
            <FcfsMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={maxSupplyFcfs} maxMint={maxMintfcfs} fcfsAddresses={fcfsAddresses} fcfsSupply={fcfsSupply} eligible={false}/>
          </TabsContent>

          <TabsContent value="public" className="mt-4">
            <PublicMint UwUAddress={UwUAddress} ethPrice={ethPrice} maxSupply={2000} maxMint={maxMintPublic} publicSupply={supply} eligible={false}/>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}


