import React from "react";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "./index.css";
import ImageCard from "./ImageCard";
import card1 from "../asset/images/card1.png";
import card2 from "../asset/images/card2.png";
import card3 from "../asset/images/card3.png";
import card4 from "../asset/images/card4.png";

export default function SlideCarousel() {
  const cardWidth = 358;
  const cardHeight = 246;
  const titleWidth = 150;
  const title = "Earn Collectible HIFI Competition";

  const leftClick = (e) => {
    let lastItem;
    let carouselContainer;
    let carouselCards;

    carouselCards = document.getElementsByClassName("carouselCard");
    carouselContainer = document.getElementById("CarouselContainer");
    lastItem = carouselCards[carouselCards.length - 1];
    lastItem.remove();
    carouselContainer.insertBefore(lastItem, carouselContainer.children[0]);

    adjustItems();
  };

  const rightClick = (e) => {
    let carouselCards;
    let firstItem;

    carouselCards = document.getElementsByClassName("carouselCard");
    firstItem = carouselCards[0];
    firstItem.remove();
    document.getElementById("CarouselContainer").appendChild(firstItem);

    adjustItems();
  };

  const adjustItems = () => {
    let container = document.getElementById("CarouselContainer");
    let dimension = container.getBoundingClientRect();
    let totalWidth = dimension.width;
    let carouselCards = document.getElementsByClassName("carouselCard");
    let countCard = 5;
    let scale = 0.05;
    let buttonWidth = 50;
    let margin = 1 / 4;
    let middle = totalWidth / 2;
    let mid = (countCard - 1) / 2;
    for (let i = 0; i < countCard; i++) {
      let val = Math.abs(mid - i);
      let scaleVal = 1 - scale * val;
      carouselCards[i].style.width = `${cardWidth}px`;
      carouselCards[i].style.top = `${Math.abs(
        (((mid - i) * scale) / 2) * cardHeight
      )}px`; // + val*scale /2 * cardHeight+'px';
      carouselCards[i].style.left = `${
        middle +
        (margin * (mid - i) - 1 / 2 + ((mid - i) * scale) / 2) * cardWidth
      }px`;
      carouselCards[i].style.transform = `scale(${scaleVal})`;
      carouselCards[i].style.zIndex = `${mid - val + 1}`;
      carouselCards[i].style.opacity = "1";
    }

    for (let i = countCard; i < carouselCards.length; i++) {
      carouselCards[i].style.opacity = "0";
    }

    let leftButton = document.getElementById("carouselLeftButton");
    let rightButton = document.getElementById("carouselRightButton");
  
    leftButton.style.top = `${cardHeight/2 - buttonWidth/2}px`;
    leftButton.style.left = `${middle - cardWidth/2}px`;
    leftButton.style.zIndex = "4";

    rightButton.style.top = `${cardHeight/2 - buttonWidth/2}px`;
    rightButton.style.left = `${middle + cardWidth/2 - buttonWidth}px`;
    rightButton.style.zIndex = "4";

  };
  window.addEventListener("resize", adjustItems);

  useEffect(() => {
    const interval = setInterval(() => {
      rightClick();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    adjustItems();
  });
  return (
    <div className="relative w-[100%]" id="CarouselContainer">
      <div
        id="carouselLeftButton"
        className="absolute carouselButton cursor-pointer"
        onClick={(event) => leftClick(event)}
      >
        <ArrowBackIcon
          sx={{
            backgroundColor: "white",
            width: "25px",
            height: "25px",
            color: "#120b16",
          }}
        />
      </div>
      <div
        id="carouselRightButton"
        className="absolute carouselButton cursor-pointer"
        onClick={(event) => rightClick(event)}
      >
        <ArrowForwardIcon
          sx={{
            backgroundColor: "white",
            width: "25px",
            height: "25px",
            color: "#120b16",
          }}
        />
      </div>
      <div className="absolute carouselCard">
        <ImageCard
          src={card1}
          width={cardWidth}
          height={cardHeight}
          title={title}
          titleWidth={titleWidth}
        />
      </div>
      <div className="absolute carouselCard">
        <ImageCard
          src={card2}
          width={cardWidth}
          height={cardHeight}
          title={title}
          titleWidth={titleWidth}
        />
      </div>
      <div className="absolute carouselCard">
        <ImageCard
          src={card3}
          width={cardWidth}
          height={cardHeight}
          title={title}
          titleWidth={titleWidth}
        />
      </div>
      <div className="absolute carouselCard">
        <ImageCard
          src={card4}
          width={cardWidth}
          height={cardHeight}
          title={title}
          titleWidth={titleWidth}
        />
      </div>
      <div className="absolute carouselCard">
        <ImageCard
          src={card1}
          width={cardWidth}
          height={cardHeight}
          title={title}
          titleWidth={titleWidth}
        />
      </div>
    </div>
  );
}
