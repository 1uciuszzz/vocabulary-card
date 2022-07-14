import { Box, Button, Divider, List, ListItem, ListItemText, ListSubheader, Stack } from '@mui/material';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { actionTypes } from '../constant';
import { SideMenuVocabularies, stateContext } from '../interfaces';
import About from './About';
import Profile from './Profile';

const SideMenu = () => {
  const { state, dispatch } = useOutletContext<stateContext>()
  const structureList: SideMenuVocabularies[] = [];
  const copiedWords = [...state.vocabularies];
  let prevPhrase = "";
  copiedWords
    .sort((a, b) => a.spelling.localeCompare(b.spelling))
    .forEach((vocabulary) => {
      if (vocabulary.spelling[0] !== prevPhrase) {
        prevPhrase = vocabulary.spelling[0];
        structureList.push({
          phrase: vocabulary.spelling[0],
          vocabularies: [vocabulary],
        });
      } else {
        structureList[structureList.length - 1].vocabularies.push(vocabulary);
      }
    });
  return (
    <Stack direction={"column"}>
      <Profile />
      <Divider />
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          height: "80vh",
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
                {item.vocabularies.map((vocabulary) => (
                  <ListItem key={vocabulary.id}>
                    <ListItemText>
                      <Button
                        fullWidth
                        style={{
                          textTransform: "lowercase",
                          fontFamily: "roboto serif",
                        }}
                        onClick={() => {
                          state.vocabularies.forEach((originVocabulary, index) => {
                            if (vocabulary.spelling === originVocabulary.spelling) {
                              dispatch({ type: actionTypes.INDEX, payload: { index } });
                            }
                          });
                        }}
                      >
                        {vocabulary.spelling}
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
    </Stack>
  )
}

export default SideMenu