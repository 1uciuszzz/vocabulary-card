import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { stateContext } from '../interfaces'
import SignOutDialog from './SignOutDialog';

const Profile = () => {
  const { state } = useOutletContext<stateContext>();
  return (
    <Stack direction={"column"} style={{ height: "10vh" }}>
      <Typography variant='h6' style={{ textAlign: "center" }}>Hello! {state.user.username}</Typography>
      <SignOutDialog />
    </Stack>
  )
}

export default Profile