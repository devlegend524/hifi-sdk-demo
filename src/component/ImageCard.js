import React from "react";

export default function ImageCard(props) {
  const { src, width, height, title, titleWidth } = props;
  return (
    <div
      className="relative rounded-[24px]"
      style={{
        background:
          "linear-gradient(#120b16 0 0) padding-box, linear-gradient(to right, #d629f5, #2734fe) border-box",
        border: "4px solid transparent",
      }}
    >
      <img
        src={src}
        className="rounded-[18px]"
        style={{ width: `${width}px`, height: `${height}px` }}
        alt="Card Image"
      />
      <p
        className="absolute bottom-[8px] left-[16px] text-[18px] text-gray-200 font-bold"
        style={{ width: `${titleWidth}px` }}
      >
        {title}
      </p>
    </div>
  );
}
