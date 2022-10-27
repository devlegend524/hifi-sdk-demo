import React from 'react'
import logo from './asset/images/logo_small.png'
import MainContainer from './component/MainContainer'
import SlideCarousel from './component/SlideCarousel'

export default function Main() {
  return (
    <div className="flex flex-col gap-3 items-center">
        <img src={logo} alt="logo image" className="w-[236px]"/>
        <p className="text-[36px] text-white">
            Play with friends, explore web3 games
        </p>
        <SlideCarousel />
        <MainContainer>
            
        </MainContainer>
    </div>
  )
}
