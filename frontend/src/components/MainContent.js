import { Typography, Card } from "@mui/material";
import React, { useContext } from "react";

import { MUWContext } from "./../App";
import WordCard from "./WordCard";
import WordForm from "./WordForm";

export default function MainContent() {
  const { state } = useContext(MUWContext);
  if (state.words.length) {
    if (state.currCardStatus) {
      return <WordCard />;
    } else {
      return <WordForm />;
    }
  } else {
    return (
      <Card
        style={{
          height: "90vh",
          padding: "50px",
        }}
      >
        <Typography variant="h2">There is no words</Typography>
        <WordForm />
      </Card>
    );
  }
}
