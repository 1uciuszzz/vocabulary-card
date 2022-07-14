import { Box, Link, Stack, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <Box>
      <Stack
        direction={"row"}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Typography>Author:</Typography>
        <Link
          underline="none"
          href="https://1uciuszzz.github.io"
          target={"_blank"}
          rel="noreferrer"
        >
          @1uciuszzz
        </Link>
      </Stack>
    </Box>
  )
}

export default About