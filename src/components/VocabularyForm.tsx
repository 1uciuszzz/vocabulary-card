import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import React, { FormEvent, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actionTypes } from '../constant';
import { stateContext } from '../interfaces';
import { createVocabulary } from './../utils/api';

const VocabularyForm = () => {
  const { state, dispatch } = useOutletContext<stateContext>()
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    spelling: "",
    meaning: "",
    sentence: "",
    origin: "",
  });
  const handleInputs = (e: any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { spelling, meaning, sentence, origin } = inputs;
    if (spelling && meaning && sentence && origin) {
      setOpen(false);
      const { data } = await createVocabulary({
        spelling: inputs.spelling,
        meaning: inputs.meaning,
        sentence: inputs.sentence,
        origin: inputs.origin,
      });
      toast.success("create vocabulary success")
      dispatch({ type: actionTypes.CREATE_VOCABULARY, payload: { vocabulary: data } });
    }
    setInputs({ spelling: "", meaning: "", sentence: "", origin: "" });
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
              name="spelling"
              id="spelling"
              label="Spelling"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.spelling}
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
              name="origin"
              id="origin"
              label="Add From"
              fullWidth
              margin="dense"
              variant="standard"
              value={inputs.origin}
              onChange={handleInputs}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setInputs({
                  spelling: "",
                  meaning: "",
                  sentence: "",
                  origin: "",
                });
              }}
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>)
}

export default VocabularyForm