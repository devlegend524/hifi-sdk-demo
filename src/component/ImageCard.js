import React from "react";

export default function ImageCard(props) {
  const { src, width, height, title, titleWidth } = props;
  return (
    <div
      style={{
        background:
          "linear-gradient(#120b16 0 0) padding-box, linear-gradient(to right, #d629f5, #2734fe) border-box",
        border: "4px solid transparent",
        position: "relative",
        borderRadius: "24px"
      }}
    >
      <img
        src={src}
        style={{ width: `${width}px`, height: `${height}px` , borderRadius: "18px"}}
        alt="Card Image"
      />
      <p
        style={{ width: `${titleWidth}px` , position: "absolute", bottom: "8px", left: "16px", fontSize: "18px", color: "white", fontWeight: "700"}}
      >
        {title}
      </p>
    </div>
  );
}
