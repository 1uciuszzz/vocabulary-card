import React from 'react'
import { CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <div className='h-screen w-screen grid place-content-center'><CircularProgress /></div>
  )
}

export default Loader