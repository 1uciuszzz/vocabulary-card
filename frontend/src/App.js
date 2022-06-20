import React, { useReducer, useEffect, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Paper, Stack, Container, Badge } from "@mui/material";

import reducer from "./utils/reducer";
import { get_words } from "./utils/api";
import SideMenu from "./components/SideMenu";
import MainContent from "./components/MainContent";

export const MUWContext = createContext();
const initState = {
  words: [],
  loading: true,
  currIndex: 0,
  currCardStatus: true,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    (async () => {
      const { data } = await get_words();
      dispatch({ type: "get", words: data });
      dispatch({ type: "loaded" });
    })();
  }, []);
  return (
    <MUWContext.Provider
      value={{
        state,
        dispatch,
        toast,
      }}
    >
      <Container
        style={{
          height: "100vh",
        }}
      >
        <Stack
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
            gap: "50px",
          }}
          direction={"row"}
        >
          <Paper>
            <Badge badgeContent={state.words.length} color={"primary"}>
              <SideMenu />
            </Badge>
          </Paper>
          <Paper
            style={{
              flex: "1",
            }}
          >
            <MainContent />
          </Paper>
        </Stack>
      </Container>

      <ToastContainer />
    </MUWContext.Provider>
  );
}
