import React from 'react';
import logo from './asset/images/logo_small.png';
import MainContainer from './component/MainContainer';
import SlideCarousel from './component/SlideCarousel';
export default function Main() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 items-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "logo image",
    className: "w-[236px]"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[36px] text-white"
  }, "Play with friends, explore web3 games"), /*#__PURE__*/React.createElement(SlideCarousel, null), /*#__PURE__*/React.createElement(MainContainer, null));
}