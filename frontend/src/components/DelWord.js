import React, { useContext } from "react";
import { Popover, Button } from "@mui/material";
import { MUWContext } from "./../App";
import { del_word } from "../utils/api";

export default function DelWord() {
  const { state, dispatch } = useContext(MUWContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "delete_card" : undefined;

  return (
    <>
      <Button aria-describedby={id} variant="text" onClick={handleClick}>
        Delete🗑️
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Button
          color="error"
          onClick={() => {
            setAnchorEl(null);
            dispatch({ type: "delete", id: state.words[state.currIndex].id });
            dispatch({ type: "index", index: 0 });
            del_word(state.words[state.currIndex].id);
          }}
        >
          Confirm❌
        </Button>
      </Popover>
    </>
  );
}
