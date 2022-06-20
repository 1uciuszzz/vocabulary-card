import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <Box>
      <Stack
        direction={"row"}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="p">Author:</Typography>
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
  );
}
