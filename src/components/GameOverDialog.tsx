import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GameStatus } from "../types";

const messageByStatus = (status: GameStatus) => {
  switch (status) {
    case GameStatus.Won: {
      return "You win!";
    }
    case GameStatus.Lost: {
      return "You lose :(";
    }
    case GameStatus.InProgress: {
      return "Restarting...";
    }
  }
};

const GameOverDialog = ({
  status,
  onClose,
}: {
  status: GameStatus;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={status !== GameStatus.InProgress}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {messageByStatus(status)}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Play again
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverDialog;
