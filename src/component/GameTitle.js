import React from "react";

export default function GameTitle() {
  const title = "Don't brake-High Score";
  const time = "00:15 19th Oct - 23:15 19th Oct (UTC)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <p style={styles.p}>{title}</p>
      <p style={styles.p}>{time}</p>
    </div>
  );
}
const styles = {
  p: {
    color: "white",
    fontWeight: "700",
    fontSize: "14px",
  },
};
