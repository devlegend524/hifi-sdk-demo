import React from "react";
import logo from "./asset/images/logo_small.png";
import MainContainer from "./component/MainContainer";
import SlideCarousel from "./component/SlideCarousel";
export default function Main(props) {
  const {
    apiKey,
    playerId
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "logo",
    style: {
      width: "236px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "36px",
      color: "white",
      textAlign: "center"
    }
  }, "Play with friends, explore web3 games"), /*#__PURE__*/React.createElement(SlideCarousel, null), /*#__PURE__*/React.createElement(MainContainer, {
    apiKey: apiKey,
    playerId: playerId
  }));
}