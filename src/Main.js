import React from 'react'
import logo from './asset/images/logo_small.png'
import ImageCard from './component/ImageCard'

import card1 from './asset/images/card1.png'
export default function Main() {
  return (
    <div className="flex flex-col gap-3 items-center">
        <img src={logo} alt="logo image" className="w-[236px]"/>
        <p className="text-[36px] text-white">
            Play with friends, explore web3 games
        </p>
        <ImageCard src={card1} width={358} height={246} title="Earn Collectible HIFI Competition" titleWidth={150}/>
    </div>
  )
}
