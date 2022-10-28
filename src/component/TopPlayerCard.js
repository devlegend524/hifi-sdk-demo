import React from "react";

export default function TopPlayerCard(props) {
  const { src, name, score } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
        fontSize: '12px',
        fontWeight: '500'
      }}
    >
      <img
        src={src}
        style={{ width: "40px", height: "40px", borderRadius: "30px" }}
        alter="top player image"
      />
      <p>{name}</p>
      <p>{score}</p>
    </div>
  );
}
