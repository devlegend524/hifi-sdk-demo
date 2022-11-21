import React from "react";
import logo from "./asset/images/logo_small.png";
import MainContainer from "./component/MainContainer";
import SlideCarousel from "./component/SlideCarousel";

export default function Main() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="logo image" style={{ width: "236px" }} />
      <p style={{ fontSize: "36px", color: "white", textAlign: "center" }}>
        Play with friends, explore web3 games
      </p>
      <SlideCarousel />
      <MainContainer></MainContainer>
    </div>
  );
}
