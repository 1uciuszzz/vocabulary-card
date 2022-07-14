import { Card, Typography } from '@mui/material';
import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { stateContext } from '../interfaces';
import VocabularyCard from './VocabularyCard';
import VocabularyForm from './VocabularyForm';

const MainContent = () => {
  const { state, dispatch } = useOutletContext<stateContext>()
  if (state.vocabularies.length) {
    return <VocabularyCard state={state} dispatch={dispatch} />
  } else {
    return (
      <Card
        style={{
          height: "90vh",
          padding: "50px",
        }}
      >
        <Typography variant="h2">There is no words</Typography>
        <VocabularyForm />
      </Card>
    );
  }
}

export default MainContent