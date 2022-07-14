import { Button, Popover } from '@mui/material';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actionTypes } from '../constant';
import { stateContext } from '../interfaces';
import { deleteVocabulary } from '../utils/api';

const DeleteVocabulary = () => {
  const { state, dispatch } = useOutletContext<stateContext>()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
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
            deleteVocabulary(state.vocabularies[state.currentVocabularyIndex].id).then(r => {
              if (r.status === 204) {
                dispatch({ type: actionTypes.DELETE_VOCABULARY, payload: { id: state.vocabularies[state.currentVocabularyIndex].id } });
                dispatch({ type: actionTypes.INDEX, payload: { index: 0 } });
                toast.success("delete vocabulary success")
              } else {
                toast.error("something went wrong")
              }
            })
          }}
        >
          Confirm❌
        </Button>
      </Popover>
    </>
  );
}

export default DeleteVocabulary