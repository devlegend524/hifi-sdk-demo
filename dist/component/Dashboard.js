import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuid_v4 } from "uuid";
import { apiFetchDataWithSig } from "../helpers/apiFetchWrappers";
import { API_URL, Game_URL } from "../config";
import card1 from "../asset/images/card1.png";
import podiumImage from "../asset/images/hifiPodium.png";
import TopPlayerCard from "./TopPlayerCard";
import "./index.css";
const prizePoolData = [{
  rank: "1st",
  prize: "15Merits",
  color: "#FFFF00"
}, {
  rank: "1nd",
  prize: "12Merits",
  color: "#00FFFF"
}, {
  rank: "3rd",
  prize: "8Merits",
  color: "#FF00FF"
}, {
  rank: "4-5th",
  prize: "5Merits",
  color: "#FFFFFF"
}, {
  rank: "6-10th",
  prize: "3Merits",
  color: "#FFFFFF"
}, {
  rank: "11-15th",
  prize: "2Merits",
  color: "#FFFFFF"
}, {
  rank: "16-20th",
  prize: "1Merits",
  color: "#FFFFFF"
}];
const participants = 35;
const position = 34;
export default function Dashboard(props) {
  const {
    setGameId,
    gameData,
    setGameData,
    gameId
  } = props;
  useEffect(() => {
    const fetchAPIGames = async () => {
      try {
        const resp = await apiFetchDataWithSig(`ApiGame/GetGames`, "GET", null, null);
        console.log(resp.value);
        setGameData(resp.value);
      } catch (error) {
        console.log("failed to fetch games");
      }
    };
    fetchAPIGames();
  }, []);
  const handleGameImageClick = (e, gameId) => {
    e.preventDefault();
    setGameId(gameId);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dashboardAvatarContainer",
    style: {
      display: "flex",
      flexDirection: "column",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: card1,
    style: {
      borderRadius: "6px",
      borderColor: "yellow",
      borderWidth: "2px"
    },
    className: "dashboardAvatar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "16px",
      margin: "auto",
      fontWeight: "700"
    }
  }, "Stats"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      fontWeight: "400"
    }
  }, "Participants\xA0\xA0\xA0\xA0\xA0\xA0\xA0", /*#__PURE__*/React.createElement("b", null, participants)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "12px",
      fontWeight: "400"
    }
  }, "Your Position\xA0\xA0\xA0\xA0\xA0", /*#__PURE__*/React.createElement("b", null, position)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "20px",
      color: "yellow",
      fontWeight: "700"
    }
  }, "Prize Pool"), prizePoolData.map(data => {
    return /*#__PURE__*/React.createElement("div", {
      key: uuid_v4(),
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "0.75rem",
        color: `${data.color}`
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "auto"
      }
    }, data.rank), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "auto"
      }
    }, data.prize));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundImage: `url(${podiumImage})`,
      width: "200px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "175px",
      marginTop: "60px",
      marginLeft: "15px",
      position: "relative"
    },
    className: "podiumContainer"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "68px",
      top: "-50px"
    }
  }, /*#__PURE__*/React.createElement(TopPlayerCard, {
    src: card1,
    name: "YHG",
    score: "202"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "7px",
      top: "-20px"
    }
  }, /*#__PURE__*/React.createElement(TopPlayerCard, {
    src: card1,
    style: {
      position: "absolute"
    },
    name: "Chief",
    score: "75"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "127px",
      top: "10px"
    }
  }, /*#__PURE__*/React.createElement(TopPlayerCard, {
    src: card1,
    style: {
      position: "absolute"
    },
    name: "Aptar",
    score: "72"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      alignItems: "flex-end",
      flexGrow: "1"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      fontSize: "16px",
      fontWeight: "700"
    }
  }, "Competition Games"), gameData.map(data => {
    return /*#__PURE__*/React.createElement("img", {
      key: uuid_v4(),
      src: `${Game_URL}/${data.img}`,
      className: "gameBoardImage",
      style: {
        borderWidth: `${gameId === data.id ? '3px' : '0px'}`
      },
      alt: "game1",
      onClick: e => handleGameImageClick(e, data.id)
    });
  })));
}