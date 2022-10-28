import React from "react";
import { v4 as uuid_v4 } from "uuid";
import card1 from "../asset/images/card1.png";
import podiumImage from "../asset/images/hifiPodium.png";
import TopPlayerCard from "./TopPlayerCard";
import game1 from "../asset/images/game1.png";
import game2 from "../asset/images/game2.png";
import game3 from "../asset/images/game3.png";
import "./index.css";

const prizePoolData = [
  {
    rank: "1st",
    prize: "15Merits",
    color: "#FFFF00",
  },
  {
    rank: "1nd",
    prize: "12Merits",
    color: "#00FFFF",
  },
  {
    rank: "3rd",
    prize: "8Merits",
    color: "#FF00FF",
  },
  {
    rank: "4-5th",
    prize: "5Merits",
    color: "#FFFFFF",
  },
  {
    rank: "6-10th",
    prize: "3Merits",
    color: "#FFFFFF",
  },
  {
    rank: "11-15th",
    prize: "2Merits",
    color: "#FFFFFF",
  },
  {
    rank: "16-20th",
    prize: "1Merits",
    color: "#FFFFFF",
  },
];
export default function ScoreBoard() {
  const participants = 35;
  const position = 34;
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.75rem" }}>
      <div
        className="scoreBoardAvatarContainer"
        style={{ display: "flex", flexDirection: "column", color: "white" }}
      >
        <img
          src={card1}
          style={{
            borderRadius: "6px",
            borderColor: "yellow",
            borderWidth: "2px",
          }}
          className="scoreBoardAvatar"
        ></img>
        <div style={{marginTop: '10px'}}>
          <p style={{ fontSize: "16px", margin: 'auto', fontWeight: "700" }}>
            Stats
          </p>
          <p style={{ fontSize: "12px", fontWeight: "400" }}>
            Participants&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{participants}</b>
          </p>
          <p style={{ fontSize: "12px", fontWeight: "400" }}>
            Your Position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{position}</b>
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "20px", color: "yellow", fontWeight: "700" }}>
          Prize Pool
        </p>
        {prizePoolData.map((data) => {
          return (
            <div
              key={uuid_v4()}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.75rem",
                color: `${data.color}`,
              }}
            >
              <p style={{ margin: "auto" }}>{data.rank}</p>
              <p style={{ margin: "auto" }}>{data.prize}</p>
            </div>
          );
        })}
      </div>
      <div
        style={{
          backgroundImage: `url(${podiumImage})`,
          width: "200px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          height: "175px",
          marginTop: "60px",
          marginLeft: "15px",
          position: "relative",
        }}
        className="podiumContainer"
      >
        <div style={{ position: "absolute", left: "68px", top: "-50px" }}>
          <TopPlayerCard src={card1} name="YHG" score="202" />
        </div>
        <div style={{ position: "absolute", left: "7px", top: "-20px" }}>
          <TopPlayerCard
            src={card1}
            style={{ position: "absolute" }}
            name="Chief"
            score="75"
          />
        </div>
        <div style={{ position: "absolute", left: "127px", top: "10px" }}>
          <TopPlayerCard
            src={card1}
            style={{ position: "absolute" }}
            name="Aptar"
            score="72"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "flex-end",
          flexGrow: "1",
        }}
      >
        <p style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>
          Competition Games
        </p>
        <img
          src={game1}
          style={{ width: "120px", height: "90px", borderRadius: "5px" }}
          alt="game1"
        />
        <img
          src={game2}
          style={{ width: "120px", height: "90px", borderRadius: "5px" }}
          alt="game1"
        />
        <img
          src={game3}
          style={{ width: "120px", height: "90px", borderRadius: "5px" }}
          alt="game1"
        />
      </div>
    </div>
  );
}
