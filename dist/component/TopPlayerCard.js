import React from "react";
export default function TopPlayerCard(props) {
  const {
    src,
    name,
    score
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      color: "white",
      alignItems: "center",
      fontSize: '12px',
      fontWeight: '500'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    style: {
      width: "40px",
      height: "40px",
      borderRadius: "30px"
    },
    alter: "top player image",
    alt: "top player"
  }), /*#__PURE__*/React.createElement("p", null, name), /*#__PURE__*/React.createElement("p", null, score));
}