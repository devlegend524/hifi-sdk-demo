import React from "react";
import video from "../asset/videos/Blocky Road Big.mp4";
import game1 from "../asset/images/game1.png";
import game2 from "../asset/images/game2.png";
import game3 from "../asset/images/game3.png";
export default function GameBoard(props) {
  const {
    callback
  } = props;
  const handleClick = e => {
    e.preventDefault();
    callback();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("video", {
    style: {
      borderRadius: "16px"
    },
    autoPlay: true,
    loop: true,
    muted: true
  }, /*#__PURE__*/React.createElement("source", {
    src: video,
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: 'absolute',
      right: '30px',
      top: '0px',
      height: '100%',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: game1,
    className: "gameBoardImage",
    alt: "game1",
    onClick: e => handleClick(e)
  }), /*#__PURE__*/React.createElement("img", {
    src: game2,
    className: "gameBoardImage",
    alt: "game1",
    onClick: e => handleClick(e)
  }), /*#__PURE__*/React.createElement("img", {
    src: game3,
    className: "gameBoardImage",
    alt: "game1",
    onClick: e => handleClick(e)
  })));
}