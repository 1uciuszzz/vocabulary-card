import React, { useContext } from "react";
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";

import { MUWContext } from "../App";
import WordForm from "./WordForm";
import { master } from "../utils/api";
import DelWord from "./DelWord";

export default function WordCard() {
  const { state, dispatch } = useContext(MUWContext);
  const { spell, meaning, sentence, add_from, add_date, mastered } =
    state.loading ? {} : state.words[state.currIndex];
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
              Spell🔣
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
                {spell}
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
              <Typography variant="p">{sentence}</Typography>
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
                <Typography variant="p" color="text.secondary">
                  {add_from}
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
                <Typography variant="p" color="text.secondary">
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
            <WordForm />
            <Button
              disabled={state.words[state.currIndex].mastered}
              onClick={() => {
                dispatch({
                  type: "master",
                  id: state.words[state.currIndex].id,
                });
                master(state.words[state.currIndex].id);
              }}
            >
              Mark As Mastered✅
            </Button>
            <DelWord />
            <Button
              onClick={() => {
                dispatch({ type: "next" });
              }}
            >
              Next⏭
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
