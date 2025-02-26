'use client';


import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { simulateContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'

import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useSimulateContract } from 'wagmi';


import '@rainbow-me/rainbowkit/styles.css';
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import uwuAbi from '../../../UwuERC721AC.json'
import { parseEther } from "viem";
import { config } from '@/lib/config';
declare let window: any;

const UwUAddress = "0x6e5cC04e76F325663DF8e5A6070005e2929B4db9"

const ogAddresses = [
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  "0xAAb7feaA8b337BA8e87d06F4e62029E9BF0975Ee"
].map(addr => addr.toLowerCase()); // Convert to lowercase



export default function MintBtn() {
  const leafNodes = ogAddresses.map(addr => keccak256(addr));

  const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})
  const rootHash = merkleTree.getRoot().toString('hex')
  const buf2hex = (x: any) => '0x' + x.toString('hex')

  // const { data: hash, writeContract } = useWriteContract()
  const { connector, address } = useAccount();
  const { data: agwClient } = useAbstractClient();
  const { data: abstractClient, isLoading, error } = useAbstractClient();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // useEffect(() => {
  //     console.log('Abstract Client Status:', {
  //         client: abstractClient,
  //         isLoading,
  //         error
  //     });
      
  // }, [abstractClient, isLoading, error]);
    // const mintNFT = async () => {
    //     if (!address || !connector) return;

    //     console.log(connector)
    //     console.log(address)

    //     if (connector.name === 'Abstract') {
    //         console.log('client ' +abstractClient);        
    //         console.log('loading ' +isLoading)
    //         console.log('err ' +error)
    //         // Abstract Client: Use sendTransaction for Abstract L2
    //         if (!agwClient) return;

    //         console.log('aaaaah')
    //         // const network = await agwClient.
            
    //         //   const toAddress = "0xYourContractAddress";
    //         //   const mintData = "0xYourMintFunctionCall";  // ABI-encoded minting function data
      
    //         //   try {
    //         //     const txHash = await agwClient.sendTransaction({
    //         //       to: toAddress,
    //         //       data: mintData,
    //         //       from: address,
    //         //     //   value: 0,  // Optional
    //         //     //   gas: 500000,  // Estimate gas if necessary
    //         //     //   maxFeePerGas: 1000000000,  // Gas fees
    //         //     //   maxPriorityFeePerGas: 500000000,
    //         //     });
      
    //         //     console.log('Minting Transaction Hash:', txHash);
    //         //     alert('Minting successful! Transaction Hash: ' + txHash);
    //         //   } catch (error) {
    //         //     console.error('Minting failed', error);
    //         //     alert('Minting failed');
    //         //   }
            
    //       // } else if (connector.name === 'MetaMask' || 'Phantom') {
    //       //   console.log('aaah')
    //       //   // MetaMask: Use Ethers.js for Ethereum transactions
    //       //   try {
    //       //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //       //     const signer = provider.getSigner();
    //       //     const contract = new ethers.Contract(
    //       //       "0xYourContractAddress", // NFT contract address
    //       //       ["function mint(address to) public"], // Mint function ABI
    //       //       signer
    //       //     );
      
    //       //     const tx = await contract.mint(account.address);
    //       //     await tx.wait();
    //       //     alert('Minting successful!');
    //       //   } catch (error) {
    //       //     console.error('Minting failed with MetaMask:', error);
    //       //     alert('Minting failed');
    //       //   }
    //       // } else {
    //       //   alert('No supported wallet detected');
    //       // }
      
    // };

  

    const ogMint = async () => { 
      if (!address || !connector || !window.ethereum) return;

      // Hash the current user's address for the merkle proof
      const hashedAddress = keccak256(address);
      const proof = merkleTree.getHexProof(hashedAddress); // Generate the proof
      
      console.log(proof)
      const quantity = BigInt(1); // Number of tokens to mint
      const usePengu = false; // Whether to use Pengu tokens for payment
      // const simulation = await simulateContract(config, {
      //   abi: uwuAbi,
      //   address: UwUAddress,
      //   functionName: 'safeTransferFrom',
      //   args: [
      //     '0xAAb7feaA8b337BA8e87d06F4e62029E9BF0975Ee',
      //     '0x4AE70b51E3c82da5Be3284D90325FFa1898340d7',
      //     BigInt(1)
      //   ],
      //   // value: parseEther("0.0069"), // ETH_MINT_PRICE * quantity
      // })
      // console.log(simulation)


      const hash = await writeContract(config, {
        abi: uwuAbi,
        address: UwUAddress,
        functionName: 'ogMint',
        args: [
          quantity,
          usePengu,
          proof
        ],
        value: parseEther("0.0069"), // ETH_MINT_PRICE * quantity
      })
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash
      })

      console.log(transactionReceipt)

  
    }

  return (
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
                <button onClick={ogMint} className="rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
                transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
                active:shadow-[0_0_0_#000] active:translate-y-2">
                    Mint Your UwU
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
      </div>

  )
}



