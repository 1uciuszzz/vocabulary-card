import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { actionTypes } from '../constant';
import { stateContext } from '../interfaces';

const SignOutDialog = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useOutletContext<stateContext>();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    dispatch({ type: actionTypes.SIGN_OUT, payload: {} })
    setOpen(false)
    navigate("/signin", { replace: true })
  }

  return (
    <>
      <Button onClick={handleClickOpen}>
        Sign Out
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to sign out?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No🙅‍♀️</Button>
          <Button onClick={handleSignOut} autoFocus>
            Yep!🙆‍♂️
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignOutDialog