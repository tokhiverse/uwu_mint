'use client';

import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function Mint2() {
  const [isEth, setIsEth] = useState(true);

  return (
    <div className="absolute p-6 py-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] w-[1000px] bg-[#F8FFE8] border-4 border-[#000] rounded-[100px] shadow-[0_4px_0_#000]">
      <h1 className="text-center text-4xl">Mint your UwU</h1>
      
      <div className="mt-8 space-y-4">
        {/* <h2 className="text-2xl font-bold">Total Supply</h2> */}
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-l">2.59% Minted</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span className="text-l">179/3333</span>
          </div>
          
          <Progress value={2.59} className="h-3 border-2 border-black" />
        </div>
      </div>

      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold mb-4">Mint Groups</h2> */}
        
        <Tabs defaultValue="discord" className="w-full">
          <TabsList className="w-full bg-transparent py-8 relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0F2C23]/0 via-[#79CC9E] to-[#0F2C23]/0"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0F2C23]/0 via-[#79CC9E] to-[#0F2C23]/0"></div>
            <TabsTrigger value="discord" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">UwU - OG
              <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
            </TabsTrigger>
            <TabsTrigger value="eco" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">UwU - Whitelist
              <span className="ml-2 text-xs px-2 py-1 bg-[#79CC9E] text-black rounded-full">Live</span>
            </TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:text-[#79CC9E] data-[state=active]:border-b-2 data-[state=active]:border-[#79CC9E]">Public Mint
              <span className="ml-2 text-xs px-2 py-1 bg-gray-500 text-white rounded-full">Closed</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discord" className="mt-4">
            {/* <p className="text-gray-500 mb-4">current members of the babybera discord</p> */}
            
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-sm">Limit per wallet</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-xl text-center">3</p>
              </div>
              
              <div>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-sm">Max supply</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-xl text-center">1581</p>
              </div>
              
              <div>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-sm">Whitelist Count</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-xl text-center">530</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Mint Price:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center gap-2">
                      <img 
                        src="/eth-logo.png" 
                        className={`w-10 h-10 p-2 bg-white rounded-full border-2 cursor-pointer transition-opacity duration-200
                           ${
                          isEth ? 'opacity-100 border-[#79CC9E]' : 'opacity-50'
                        } 
          bg-[#0F2C23] border-4 border-[#0F2C23] shadow-[0_4px_0_#79CC9E] 
          
          active:shadow-[0_0_0_#0F2C23] active:translate-y-1`}
                        onClick={() => setIsEth(true)}
                      />
                      <Switch
                        checked={isEth}
                        onCheckedChange={setIsEth}
                        className={`${isEth ? 'bg-[#79CC9E]' : 'bg-[#FF69B4]'} data-[state=checked]:bg-[#79CC9E] data-[state=unchecked]:bg-[#FF69B4]`}
                      />
                      <img 
                        src="/pengu-logo.jpeg" 
                        className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-opacity duration-200 ${
                          !isEth ? 'opacity-100 border-[#79CC9E]' : 'opacity-50'
                        }
                        
                                  bg-[#79CC9E] border-4 border-[#79CC9E] shadow-[0_4px_0_#79CC9E] 
          
          active:shadow-[0_0_0_#79CC9E] active:translate-y-1
          `}
                        onClick={() => setIsEth(false)}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{isEth ? '0.05 Eth' : '1.5 PENGU'}</p>
                    <p className="text-sm text-gray-500">Total: {isEth ? '0.1 Eth' : '3 PENGU'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center border-2 border-gray-700 rounded-full">
                <button className="px-4 py-2 text-xl">-</button>
                <input type="number" value="2" className="w-full text-center bg-transparent" />
                <button className="px-4 py-2 text-xl">+</button>
              </div>
{/*               
              <div className="flex justify-between items-center py-2 border-t border-gray-700">
                <span>Estimated fees</span>
                <span>0.549733 BERA</span>
              </div>
               */}
              {/* <div className="flex justify-between items-center py-2 border-t border-gray-700">
                <span>Subtotal</span>
                <span>1.319733 BERA</span>
              </div> */}
            </div>
          </TabsContent>
          
          <TabsContent value="eco">
            {/* Similar content structure for Eco Partners */}
          </TabsContent>
          
          <TabsContent value="public">
            {/* Similar content structure for Public */}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center">
        <button className="rounded-[100px] py-4 px-6 bg-[#0F2C23] text-white mt-8 border-4 border-[#000] shadow-[0_4px_0_#000] 
          transition-all duration-150 hover:shadow-[0_8px_0_#000] hover:-translate-y-1 
          active:shadow-[0_0_0_#000] active:translate-y-2">
          Connect your Wallet
        </button>
      </div>
    </div>
  )
}