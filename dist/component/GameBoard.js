function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from "react";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid_v4 } from "uuid";
import clsx from "clsx";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { API_URL, MINIMUM_PLAY_FOR_REWARD } from "../config";
import { apiFetchDataWithSig } from "../helpers/apiFetchWrappers";
import "./index.css";
const useStyles = makeStyles(() => ({
  dosplayer: {
    "& canvas": {
      width: "800px",
      height: "700px"
    }
  },
  gameContent: {
    width: "100%",
    height: "100%"
  }
}));
const Transition = /*#__PURE__*/React.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/React.createElement(Slide, _extends({
    direction: "up",
    ref: ref
  }, props));
});
function PaperComponent(props) {
  return /*#__PURE__*/React.createElement(Draggable, {
    handle: "#draggable-dialog-title",
    cancel: '[class*="MuiDialogContent-root"]'
  }, /*#__PURE__*/React.createElement(Paper, props));
}
export default function GameBoard(props) {
  const {
    callback,
    gameData,
    gameId,
    setGameId
  } = props;
  const [gameDataById, setGameDataById] = useState("");
  const [playerId, setPlayerId] = useState(1);
  const [open, setOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [confirm_open, confirm_setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [timeCounter, setTimeCounter] = useState("00:00:00");
  const [lastIdletime, setLastIdletime] = useState(null);
  const [elapsedTimeIntervalRef, setElapsedTimeIntervalRef] = useState("");
  const [control, setControl] = useState("key");
  const minimumTimeToPlay = MINIMUM_PLAY_FOR_REWARD;
  const [currentGame, setCurrentGame] = useState(null);
  const [keyImage, setKeyImage] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const handleCloseBackdrop = () => {
    setLoading(false);
  };

  // Stores the elapsed time hours, minutes and seconds details on pause
  const storeElapsedTimeOnPause = () => {
    // Break down elapsed time from display test
    const brokenDownElapsedTime = timeCounter.split(":");

    // Convert list to numbers
    const brokenDownElapsedTimeAsNumbers = brokenDownElapsedTime.map(numberAsString => parseInt(numberAsString, 10));
    const hours = brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[0] : 0;
    const minutes = brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[1] : brokenDownElapsedTimeAsNumbers[0];
    const seconds = brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[2] : brokenDownElapsedTimeAsNumbers[1];
    return parseInt(hours, 10) * 60 * 60 + parseInt(minutes, 10) * 60 + seconds;
  };
  const getElapsedTime = startTime => {
    // Record end time
    const endTime = new Date();
    // Compute time difference in milliseconds
    let timeDiff = endTime.getTime() - startTime;
    // Convert time difference from milliseconds to seconds
    timeDiff /= 1000;
    // Extract integer seconds that dont form a minute using %
    const seconds = Math.floor(timeDiff % 60); // ignoring uncomplete seconds (floor)
    // Pad seconds with a zero if neccessary
    const secondsAsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    // Convert time difference from seconds to minutes using %
    timeDiff = Math.floor(timeDiff / 60);
    // Extract integer minutes that don't form an hour using %
    const minutes = timeDiff % 60; // no need to floor possible incomplete minutes, becase they've been handled as seconds
    // Pad minutes with a zero if neccessary
    const minutesAsString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    // Convert time difference from minutes to hours
    timeDiff = Math.floor(timeDiff / 60);
    // Extract integer hours that don't form a day using %
    const hours = timeDiff % 24; // no need to floor possible incomplete hours, becase they've been handled as seconds
    // Convert time difference from hours to days
    timeDiff = Math.floor(timeDiff / 24);
    // The rest of timeDiff is number of days
    const days = timeDiff;
    const totalHours = hours + days * 24; // add days to hours
    const totalHoursAsString = totalHours < 10 ? `0${totalHours}` : `${totalHours}`;
    return totalHoursAsString === "00" ? `${minutesAsString}:${secondsAsString}` : `${totalHoursAsString}:${minutesAsString}:${secondsAsString}`;
  };

  /** Pauses stopwatch */
  const pauseTimeCounter = () => {
    // Clear interval
    if (typeof elapsedTimeIntervalRef !== "undefined") {
      clearInterval(elapsedTimeIntervalRef);
      setElapsedTimeIntervalRef(undefined);
    }
    // Store the elapsed time on pause
    return storeElapsedTimeOnPause();
  };
  const confirmHandleClickOpen = () => {
    confirm_setOpen(true);
  };
  const continueGameHandle = async () => {
    const startedTime = new Date();
    let interval = null;
    interval = setInterval(() => {
      // Compute the elapsed time & display
      let gamestartTime = 0;
      if (lastIdletime !== null) {
        gamestartTime = startedTime.getTime() - lastIdletime + 1000 * 60;
        setLastIdletime(null);
      } else {
        gamestartTime = startedTime.getTime();
      }
      setTimeCounter(getElapsedTime(gamestartTime)); // pass the actual record start time
      // Improvement: Can Stop elapsed time and resert when a maximum elapsed time
      //              has been reached.
    }, 1000);
    setElapsedTimeIntervalRef(interval);
    const options = {
      mode: "cors",
      body: JSON.stringify({
        gameId,
        playerId: playerId
      })
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const sessionIdResp = await apiFetchDataWithSig("ApiPlay/StartGame", "POST", options, headers);
    if (sessionIdResp) {
      setSessionId(sessionIdResp.sessionId);
    }
    setKeyOpen(false);
    setOpen(true);
    setTimeout(() => {
      if (document.querySelector(".gameframe")) {
        document.querySelector(".gameframe").focus();
      }
    }, 5000);
  };
  const playGame = async callBack => {
    setLoading(true);
    /*
    if (!account) {
      window.toastr.error("Please connect your wallet.");
      return;
    }
    setLoading(true);
      if (!account || !chainId || !(await _isValidChainId())) {
      window.toastr.error("Unsupported Network. Please change the network BSC Testnet");
      setLoading(false);
      return;
    }
      if (currentGame.highScoreCompatible) {
      const localSignature = getCookie(`signature-${account}`);
      if (!localSignature || localSignature === "") {
        wipeSignatureAndReRequest(
          () => {
            setLoading(false);
            callBack();
          },
          () => {
            setLoading(false);
          }
        );
          return;
      }
    }
    */
    callBack();
  };
  const browserPlayGame = async () => {
    await playGame(() => {
      setLoading(false);
      setKeyOpen(true);
    });
  };

  // Confirm To Close Game Play
  const confirm_handleClose = () => {
    confirm_setOpen(false);
  };

  // Close Game Play
  const handleClose = async () => {
    const totalPlayedTime = pauseTimeCounter();
    setOpen(false);
    confirm_setOpen(false);
    const options = {
      mode: "cors",
      body: JSON.stringify({
        sessionId,
        playerId: playerId
      })
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const finishGameResponse = await apiFetchDataWithSig("ApiPlay/FinishGame", "POST", options, headers);
    if (totalPlayedTime < Number(minimumTimeToPlay) * 60) {
      /*
      window.toastr.error(
        `Sorry! Please play for at least ${minimumTimeToPlay} minutes for the play session to be eligible for the daily mission.`
      );
      */
    }
  };
  const GetGameDataById = () => {
    for (let i = 0; i < gameData.length; i++) {
      if (gameData[i].id === gameId) {
        setGameDataById(gameData[i]);
        setCurrentGame(gameData[i]);
        setKeyImage(gameData[i].keyboardControlsImage);
      }
    }
  };
  useEffect(() => {
    GetGameDataById();
  }, [gameId]);
  const handleClick = (e, gameId) => {
    e.preventDefault();
    setGameId(gameId);
    callback();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("video", {
    style: {
      borderRadius: "16px"
    },
    autoPlay: true,
    loop: true,
    muted: true
  }, /*#__PURE__*/React.createElement("source", {
    src: `${API_URL}/${gameDataById.video}`,
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("button", {
    className: "playGameButton",
    onClick: browserPlayGame
  }, "Play Game"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: "absolute",
      right: "30px",
      top: "0px",
      height: "100%",
      justifyContent: "center"
    }
  }, gameData.map(data => {
    return /*#__PURE__*/React.createElement("img", {
      key: uuid_v4(),
      src: `${API_URL}/${data.img}`,
      style: {
        borderWidth: `${gameId === data.id ? "3px" : "0px"}`
      },
      className: "gameBoardImage",
      alt: "game1",
      onClick: e => handleClick(e, data.id)
    });
  })), currentGame && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dialog, {
    disableEscapeKeyDown: true,
    fullScreen: true,
    open: keyOpen,
    TransitionComponent: Transition
  }, /*#__PURE__*/React.createElement(AppBar, {
    className: "gameboardAppBar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    style: {
      dispay: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    onClick: async () => {
      setKeyOpen(false);
    },
    "aria-label": "close"
  }, /*#__PURE__*/React.createElement(CloseIcon, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "calc(100% - 65px)",
      position: "relative",
      marginTop: "0px"
    }
  }, currentGame?.joystickImage === undefined ? /*#__PURE__*/React.createElement("img", {
    alt: `${currentGame?.title}`,
    src: `${API_URL}/${keyImage}`,
    style: {
      width: "100%",
      height: "100%"
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => setControl(control === "key" ? "joy" : "key"),
    className: "gameboardControlButton"
  }, control === "joy" ? "Joy Stick" : "Key Control"), /*#__PURE__*/React.createElement("img", {
    alt: `${currentGame?.title}`,
    src: `${API_URL}/${control === "key" ? currentGame?.joystickImage : keyImage}`,
    style: {
      width: "100%",
      height: "100%"
    }
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: continueGameHandle,
    className: "gameboardControlButton"
  }, "Play")))), /*#__PURE__*/React.createElement(Dialog, {
    disableEscapeKeyDown: true,
    fullScreen: true,
    open: open,
    onClose: handleClose,
    TransitionComponent: Transition
  }, /*#__PURE__*/React.createElement(AppBar, {
    className: "gamebardAppBarUpdate gameboardAppBar"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    style: {
      dispay: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    edge: "start",
    color: "inherit",
    onClick: () => {
      confirmHandleClickOpen();
    },
    "aria-label": "close"
  }, /*#__PURE__*/React.createElement(CloseIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "text-center"
  }, currentGame?.title), /*#__PURE__*/React.createElement("span", {
    className: "text-center"
  }, timeCounter))), currentGame && currentGame.gameType !== 4 && /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    className: "gameframe",
    title: currentGame.title,
    src: `${API_URL}/Games/${currentGame.baseFilePath}?walletId=""&signature=""&game=${currentGame.bundleUrl}${currentGame.runFile ? `&runfile=${currentGame.runFile}` : ""}`,
    width: "100%",
    height: "100%"
  })), currentGame && currentGame.gameType === 4 && /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    className: "gameframe",
    title: currentGame.title,
    src: currentGame.baseFilePath,
    width: "100%",
    height: "100%"
  }))), /*#__PURE__*/React.createElement(Dialog, {
    disableEscapeKeyDown: true,
    open: confirm_open,
    onClose: confirm_handleClose,
    PaperComponent: PaperComponent,
    "aria-labelledby": "draggable-dialog-title"
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    style: {
      cursor: "move"
    },
    id: "draggable-dialog-title"
  }, "Confirm"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, "Are you ready to exit the game? Your gameplay time must exceed", " ", minimumTimeToPlay, " minutes to earn rewards.")), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    autoFocus: true,
    onClick: confirm_handleClose,
    color: "secondary"
  }, "No"), /*#__PURE__*/React.createElement(Button, {
    onClick: handleClose,
    color: "secondary",
    className: "playgame-close-button"
  }, "Yes"))), /*#__PURE__*/React.createElement(Backdrop, {
    open: isLoading,
    onClick: handleCloseBackdrop,
    style: {
      zIndex: 999999,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit"
  })));
}