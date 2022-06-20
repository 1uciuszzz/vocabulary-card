import {
  Button,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { add_word } from "../utils/api";
import { MUWContext } from "./../App";

export default function WordForm() {
  const { dispatch } = useContext(MUWContext);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    spell: "",
    meaning: "",
    sentence: "",
    add_from: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { spell, meaning, sentence, add_from } = inputs;
    if (spell && meaning && sentence && add_from) {
      setOpen(false);
      const { data } = await add_word({
        spell: inputs.spell,
        meaning: inputs.meaning,
        sentence: inputs.sentence,
        add_from: inputs.add_from,
      });
      dispatch({ type: "create", word: data });
    }
    setInputs({ spell: "", meaning: "", sentence: "", add_from: "" });
  };
  return (
    <>
      <Button onClick={handleOpen}>Add New Vocabulary🆕</Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Vocabulary</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              name="spell"
              id="spell"
              label="Spell"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.spell}
              onChange={handleInputs}
            />
            <TextField
              name="meaning"
              id="meaning"
              label="Meaning"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.meaning}
              onChange={handleInputs}
            />
            <TextField
              name="sentence"
              id="sentence"
              label="Sentence"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.sentence}
              onChange={handleInputs}
            />
            <TextField
              name="add_from"
              id="add_from"
              label="Add From"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.add_from}
              onChange={handleInputs}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setInputs({
                  spell: "",
                  meaning: "",
                  sentence: "",
                  add_from: "",
                });
              }}
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
