import React, { useContext } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Box,
} from "@mui/material";

import { MUWContext } from "./../App";
import About from "./About";

export default function SideMenu() {
  const { state, dispatch } = useContext(MUWContext);
  const structureList = [];
  const copiedWords = [...state.words];
  let prevPhrase = "";
  copiedWords
    .sort((a, b) => a.spell.localeCompare(b.spell))
    .forEach((word) => {
      if (word.spell[0] !== prevPhrase) {
        prevPhrase = word.spell[0];
        structureList.push({
          phrase: word.spell[0],
          words: [word],
        });
      } else {
        structureList[structureList.length - 1].words.push(word);
      }
    });
  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "90vh",
      }}
      subheader={<li />}
    >
      <Box
        style={{
          flex: "1",
          overflow: "auto",
        }}
      >
        {structureList.map((item) => (
          <li key={item.phrase}>
            <ul>
              <ListSubheader>
                <p className="uppercase">{item.phrase}</p>
              </ListSubheader>
              {item.words.map((word) => (
                <ListItem key={word.id}>
                  <ListItemText>
                    <Button
                      fullWidth
                      style={{
                        textTransform: "lowercase",
                        fontFamily: "roboto serif",
                      }}
                      onClick={() => {
                        state.words.forEach((originWord, index) => {
                          if (word.spell === originWord.spell) {
                            dispatch({ type: "index", index: index });
                          }
                        });
                      }}
                    >
                      {word.spell}
                    </Button>
                  </ListItemText>
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </Box>
      <About />
    </List>
  );
}
