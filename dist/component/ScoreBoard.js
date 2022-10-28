import React from "react";
import { v4 as uuid_v4 } from "uuid";
import card1 from "../asset/images/card1.png";
import goldCup from "../asset/images/goldcup.png";
import silverCup from "../asset/images/silvercup.png";
import bronzeCup from "../asset/images/bronzecup.png";
const scoreBoardResult = [{
  rank: 1,
  avatar: card1,
  name: "YHG1",
  score: 202
}, {
  rank: 2,
  avatar: card1,
  name: "YHG2",
  score: 180
}, {
  rank: 3,
  avatar: card1,
  name: "YHG3",
  score: 165
}, {
  rank: 4,
  avatar: card1,
  name: "YHG4",
  score: 122
}, {
  rank: 5,
  avatar: card1,
  name: "YHG5",
  score: 100
}, {
  rank: 6,
  avatar: card1,
  name: "YHG6",
  score: 88
}, {
  rank: 7,
  avatar: card1,
  name: "YHG7",
  score: 78
}, {
  rank: 8,
  avatar: card1,
  name: "YHG8",
  score: 65
}, {
  rank: 9,
  avatar: card1,
  name: "YHG9",
  score: 54
}, {
  rank: 10,
  avatar: card1,
  name: "YHG10",
  score: 33
}, {
  rank: 11,
  avatar: card1,
  name: "YHG11",
  score: 20
}];
export default function ScoreBoard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "scoreBoardContainer",
    style: {
      maxWidth: "500px",
      height: "400px",
      width: "100%",
      background: "linear-gradient(#120b16 0 0) padding-box, linear-gradient(to right, #d629f5, #2734fe) border-box",
      border: "3px solid transparent",
      margin: "auto",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "10px",
      overflowY: "scroll"
    }
  }, scoreBoardResult.map(data => {
    return /*#__PURE__*/React.createElement("div", {
      className: "scoreBoardWrapper",
      style: {
        display: "grid",
        gridTemplateColumns: "80px 1fr 100px",
        color: "white",
        fontSize: "20px",
        alignItems: "center",
        padding: "5px"
      }
    }, data.rank === 1 && /*#__PURE__*/React.createElement("img", {
      style: {
        width: "30px",
        height: "30px",
        borderRadius: "30px"
      },
      src: goldCup,
      alt: "goldCup image"
    }), data.rank === 2 && /*#__PURE__*/React.createElement("img", {
      style: {
        width: "30px",
        height: "30px",
        borderRadius: "30px"
      },
      src: silverCup,
      alt: "silverCup image"
    }), data.rank === 3 && /*#__PURE__*/React.createElement("img", {
      style: {
        width: "30px",
        height: "30px",
        borderRadius: "30px"
      },
      src: bronzeCup,
      alt: "bronzeCup image"
    }), data.rank > 3 && /*#__PURE__*/React.createElement("p", null, "\xA0", data.rank), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
        marginLeft: `${data.rank > 3 ? '30px' : '0px'}`
      }
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        width: "40px",
        height: "40px",
        borderRadius: "30px"
      },
      src: data.avatar,
      alt: "avatar image"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        marginLeft: '20px'
      }
    }, data.name)), /*#__PURE__*/React.createElement("p", null, data.score));
  }));
}