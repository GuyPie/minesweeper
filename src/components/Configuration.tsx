import React, { useState, useContext } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { MinesweeperContext } from "../state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    configuration: {
      padding: theme.spacing(1),
    },
    sliders: {
      display: "flex",
    },
    inputContainer: {
      padding: "10px",
      flex: 1,
    },
    buttons: {
      textAlign: "left",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const Configuration = ({
  newGame,
}: {
  newGame: (width: number, height: number, mineCount: number) => void;
}) => {
  const { state, dispatch } = useContext(MinesweeperContext);
  const [width, setWidth] = useState<number>(state.width);
  const [height, setHeight] = useState<number>(state.height);
  const [mineCount, setMineCount] = useState<number>(state.mineCount);
  const classes = useStyles();

  const handleWidthChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setWidth(newValue as number);
  };

  const handleHeightChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setHeight(newValue as number);
  };

  const handleMineCountChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setMineCount(newValue as number);
  };

  return (
    <div className={classes.configuration}>
      <div className={classes.sliders}>
        <div className={classes.inputContainer}>
          <Typography gutterBottom>Width</Typography>
          <Slider
            value={width}
            min={3}
            max={300}
            valueLabelDisplay="auto"
            onChange={handleWidthChange}
            aria-labelledby="continuous-slider"
          />
        </div>
        <div className={classes.inputContainer}>
          <Typography gutterBottom>Height</Typography>
          <Slider
            value={height}
            min={3}
            max={300}
            valueLabelDisplay="auto"
            onChange={handleHeightChange}
            aria-labelledby="continuous-slider"
          />
        </div>
        <div className={classes.inputContainer}>
          <Typography gutterBottom>Mines</Typography>
          <Slider
            value={mineCount}
            min={1}
            max={width * height}
            valueLabelDisplay="auto"
            onChange={handleMineCountChange}
            aria-labelledby="continuous-slider"
          />
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            newGame(width, height, Math.min(mineCount, width * height))
          }
        >
          New Game
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={state.isSuperman}
              onChange={() =>
                dispatch({
                  type: "TOGGLE_SUPERMAN",
                  payload: !state.isSuperman,
                })
              }
              name="superman"
            />
          }
          label="Superman"
        />
      </div>
    </div>
  );
};

export default React.memo(Configuration);
