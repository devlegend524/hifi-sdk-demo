import React from "react";
import video from "../asset/videos/Blocky Road Big.mp4";
import game1 from "../asset/images/game1.png";
import game2 from "../asset/images/game2.png";
import game3 from "../asset/images/game3.png";
export default function GameBoard(props) {
  const { callback } = props;

  const handleClick = (e) => {
    e.preventDefault();
    callback();
  }
  return (
    <div style={{ position: "relative" }}>
      <video style={{ borderRadius: "16px" }} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: 'absolute',
          right: '30px',
          top: '0px',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <img
          src={game1}
          className="gameBoardImage"
          alt="game1"
          onClick={(e) => handleClick(e)}
        />
        <img
          src={game2}
          className="gameBoardImage"
          alt="game1"
          onClick={(e) => handleClick(e)}
        />
        <img
          src={game3}
          className="gameBoardImage"
          alt="game1"
          onClick={(e) => handleClick(e)}
        />
      </div>
    </div>
  );
}
