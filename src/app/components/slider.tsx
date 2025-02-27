'use client';

import { useState } from "react";


export default function Slider() {
    const imgs = ['img1.gif', 'img2.png', 'img3.png', 'img4.png', ]
    const [chosenImg , setChosenImg] = useState(imgs[0])
    return (
    <>
        <div className="aspect-square bg-[#FF6B6B] overflow-hidden border-4 border-[#000] rounded-[50px] shadow-[0_4px_0_#000] mb-4">
            <img  src={chosenImg} alt="Main NFT preview" className="w-full h-full object-contain"/>
            </div>
            <div className="h-[2px] bg-gradient-to-r mb-4 from-[#fff]/0 via-[#fff] to-[#fff]/0"></div>
            <div className="grid grid-cols-4 gap-2">
            {imgs.map((img, i) => (
                <button onClick={() => setChosenImg(imgs[i])} key={i} className="aspect-square bg-white overflow-hidden rounded-3xl cursor-pointer border-2 border-[#000] shadow-[0_2px_0_#000] hover:scale-110 transition-all">
                    <img src={img} alt={`NFT preview ${i}`} className="w-full h-full object-contain "/>
                </button>
            ))}
        </div>
    </>
  )
}

