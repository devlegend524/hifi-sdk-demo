import React from "react";
import { useState } from "react";
import GameTitle from "./GameTitle";
import Dashboard from "./Dashboard";
import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import "./index.css";

export default function MainContainer(props) {
  const { apiKey, playerId } = props;
  const [isStanding, setIsStanding] = useState(0);
  const [isParticipating, setIsParticipating] = useState(0);
  const [gameData, setGameData] = useState([]);
  const [gameId, setGameId] = useState(1);
  const handleStandingButton = () => {
    setIsStanding(1 - isStanding);
  };
  const handleParticipatingButton = () => {
    setIsParticipating(1 - isParticipating);
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(#120b16 0 0) padding-box, linear-gradient(to right, #d629f5, #2734fe) border-box",
        border: "4px solid transparent",
        position: "relative",
        borderRadius: "24px",
        padding: "10px",
        marginTop: "238px",
        maxWidth: "720px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {isParticipating ? (
        <GameBoard
          callback={handleParticipatingButton}
          gameId={gameId}
          gameData={gameData}
          setGameId={setGameId}
          apiKey={apiKey}
          playerId={playerId}
        />
      ) : (
        <>
          <GameTitle />
          <Dashboard
            setGameId={setGameId}
            setGameData={setGameData}
            gameData={gameData}
            gameId={gameId}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "20px",
              color: "white",
              gap: "20px",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <button
              className="viewStandingButton"
              style={{ borderRadius: "4px", padding: "4px 8px" }}
              onClick={(e) => handleStandingButton(e)}
            >
              {isStanding ? "Hide Standing" : "View Standing"}
            </button>
            <button
              className="participatingButton"
              style={{
                borderRadius: "4px",
                padding: "4px 8px",
              }}
              onClick={(e) => handleParticipatingButton(e)}
            >
              Participating
            </button>
          </div>
          {isStanding ? <ScoreBoard /> : ""}
        </>
      )}
    </div>
  );
}
