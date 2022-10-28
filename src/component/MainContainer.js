import React from "react";
import GameTitle from "./GameTitle";
import ScoreBoard from "./ScoreBoard";

export default function MainContainer() {
  return (
    <div
      style={{
        background:
          "linear-gradient(#120b16 0 0) padding-box, linear-gradient(to right, #d629f5, #2734fe) border-box",
        border: "4px solid transparent",
        position: 'relative',
        borderRadius: '24px',
        padding: '10px',
        marginTop: '238px',
        maxWidth: '720px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <GameTitle />
      <ScoreBoard />
    </div>
  );
}
