import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuid_v4 } from "uuid";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Button as MainButton } from "@mui/material";
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

import { API_URL, Game_URL } from "../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function GameBoard(props) {
  const { callback, gameData, gameId, setGameId } = props;
  const [gameDataById, setGameDataById] = useState("");

  const GetGameDataById = () => {
    for (let i = 0; i < gameData.length; i++) {
      if (gameData[i].id === gameId) {
        setGameDataById(gameData[i]);
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
  return (
    <div style={{ position: "relative" }}>
      <video style={{ borderRadius: "16px" }} autoPlay loop muted>
        <source src={`${API_URL}/${gameDataById.video}`} type="video/mp4" />
      </video>
      <button className="playGameButton">Play Game</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "absolute",
          right: "30px",
          top: "0px",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {gameData.map((data) => {
          return (
            <img
              key={uuid_v4()}
              src={`${Game_URL}/${data.img}`}
              style={{ borderWidth: `${gameId === data.id ? "3px" : "0px"}` }}
              className="gameBoardImage"
              alt="game1"
              onClick={(e) => handleClick(e, data.id)}
            />
          );
        })}
      </div>
      {currentGame && (
        <>
          <Dialog
            disableEscapeKeyDown
            fullScreen
            open={keyOpen}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar className={classes.headerTitle}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={async () => {
                    setKeyOpen(false);
                  }}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box className={classes.keyControlContent}>
              {currentGame?.joystickImage === undefined ? (
                <img
                  alt={`${currentGame?.title}`}
                  src={keyImage}
                  className={classes.keyControlImage}
                />
              ) : (
                <>
                  <Button
                    onClick={() =>
                      setControl(control === "key" ? "joy" : "key")
                    }
                    className={classes.controlButton}
                  >
                    {control === "joy" ? "Joy Stick" : "Key Control"}
                  </Button>
                  <img
                    alt={`${currentGame?.title}`}
                    src={
                      control === "key" ? currentGame?.joystickImage : keyImage
                    }
                    className={classes.keyControlImage}
                  />
                </>
              )}
              <Button
                onClick={continueGameHandle}
                className={classes.keyControlButton}
              >
                Play
              </Button>
            </Box>
          </Dialog>
        </>
      )}
      <Dialog
        disableEscapeKeyDown
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={`${classes.appBar} appbarGameUpdate`}>
          <Toolbar className={classes.headerTitle}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                confirmHandleClickOpen();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <span className="text-center">{currentGame?.title}</span>
            <span className="text-center">{timeCounter}</span>
          </Toolbar>
        </AppBar>
        {currentGame && currentGame.gameType !== 4 && (
          <Box className={clsx(classes.gameContent, dosclass.dosplayer)}>
            <iframe
              className="gameframe"
              title={currentGame.title}
              src={`${process.env.REACT_APP_API_URL}/Games/${
                currentGame.baseFilePath
              }?walletId=${account}&signature=${signature}&game=${
                currentGame.bundleUrl
              }${currentGame.runFile ? `&runfile=${currentGame.runFile}` : ""}`}
              width="100%"
              height="100%"
            />
          </Box>
        )}
        {currentGame && currentGame.gameType === 4 && (
          <Box className={clsx(classes.gameContent, dosclass.dosplayer)}>
            <iframe
              className="gameframe"
              title={currentGame.title}
              src={currentGame.baseFilePath}
              width="100%"
              height="100%"
            />
          </Box>
        )}
      </Dialog>
      <Dialog
        disableEscapeKeyDown
        open={confirm_open}
        onClose={confirm_handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you ready to exit the game? Your gameplay time must exceed{" "}
            {minimumTimeToPlay} minutes to earn rewards.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={confirm_handleClose} color="secondary">
            No
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            className="playgame-close-button"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        className={backdrops.backdrop}
        open={isLoading}
        onClick={handleCloseBackdrop}
        style={{ zIndex: 999999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
