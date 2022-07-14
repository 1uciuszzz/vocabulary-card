import { Box, Button, Card, CardActions, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
import { actionTypes } from '../constant';
import { stateContext } from '../interfaces';
import { masterVocabulary } from '../utils/api';
import DeleteVocabulary from './DeleteVocabulary';
import VocabularyForm from './VocabularyForm';

const VocabularyCard = ({ state, dispatch }: stateContext) => {
  const { id, spelling, meaning, sentence, origin, add_date, mastered } = state.vocabularies[state.currentVocabularyIndex]
  return (
    <Box style={{ position: "relative" }}>
      <Card
        elevation={4}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          transform: "rotate(0.005turn)",
          height: "90vh",
          width: "100%",
          padding: "50px",
          zIndex: "-1",
        }}
      >
        📄
      </Card>
      <Card
        elevation={4}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          transform: "rotate(-0.008turn)",
          height: "90vh",
          width: "100%",
          padding: "50px",
          zIndex: "-1",
        }}
      >
        📄
      </Card>

      <Card
        elevation={4}
        style={{
          height: "90vh",
          padding: "50px",
          zIndex: "10",
        }}
      >
        <CardContent>
          <Stack
            direction={"row"}
            style={{
              alignItems: "center",
              gap: "20px",
              borderBottom: "solid 5px rgb(34, 20, 20)",
              marginBottom: "50px",
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Spelling🔣
            </Typography>
            {state.loading ? (
              <Skeleton
                variant="text"
                style={{ flex: "1", marginBottom: "16px" }}
                height={"60px"}
              />
            ) : (
              <Typography
                variant="h3"
                style={{
                  backgroundColor: "rgb(242, 242, 242)",
                  padding: "0 5px",
                  borderRadius: "10px",
                  color: "rgb(84, 84, 97)",
                }}
                gutterBottom
              >
                {spelling}
              </Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            style={{
              alignItems: "center",
              gap: "20px",
              borderLeft: "solid 5px rgb(143, 115, 50)",
              paddingLeft: "15px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Meaning📰
            </Typography>
            {state.loading ? (
              <Skeleton variant="text" />
            ) : (
              <Typography variant="h4">{meaning}</Typography>
            )}
          </Stack>
          <Box
            style={{
              padding: "20px",
              backgroundColor: "rgb(250, 251, 235)",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Sentence📄
            </Typography>
            {state.loading ? (
              <Skeleton variant="text" />
            ) : (
              <Typography>{sentence}</Typography>
            )}
          </Box>
          <Stack
            style={{
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "20px",
            }}
            direction={"row"}
          >
            <Box style={{ flex: "1", padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Add From💫
              </Typography>
              {state.loading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography color="text.secondary">
                  {origin}
                </Typography>
              )}
            </Box>
            <Box style={{ flex: "1", padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Add Date📅
              </Typography>
              {state.loading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography color="text.secondary">
                  {new Date(add_date).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            style={{ alignItems: "center", paddingLeft: "20px" }}
          >
            <Typography variant="h6" color="text.secondary">
              Mastered❓
            </Typography>
            {state.loading ? (
              <Skeleton variant="text" />
            ) : (
              <Typography variant="h3">{mastered ? "🤣" : "😅"}</Typography>
            )}
          </Stack>
        </CardContent>
        {state.loading ? (
          <Skeleton variant="text" />
        ) : (
          <CardActions
            style={{
              justifyContent: "space-between",
              padding: "0 16px 0 28px",
            }}
          >
            <VocabularyForm />
            <Button
              disabled={state.vocabularies[state.currentVocabularyIndex].mastered}
              onClick={() => {
                dispatch({
                  type: actionTypes.MASTER_VOCABULARY,
                  payload: { id },
                });
                masterVocabulary(id).then(r => { toast.success("congratulate!") }).catch(e => { toast.error("something went wrong") })
              }}
            >
              Mark As Mastered✅
            </Button>
            <DeleteVocabulary />
            <Button
              onClick={() => {
                dispatch({ type: actionTypes.NEXT, payload: {} });
              }}
            >
              Next⏭
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  )
}

export default VocabularyCard