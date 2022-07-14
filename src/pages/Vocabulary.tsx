import { useEffect } from 'react'
import { getUserInfo, getVocabularies } from './../utils/api';
import { useOutletContext } from "react-router-dom"
import { stateContext } from '../interfaces';
import { toast } from 'react-toastify';
import { Badge, Container, Paper, Stack } from '@mui/material';
import SideMenu from '../components/SideMenu';
import { actionTypes } from '../constant';
import MainContent from '../components/MainContent';
import Loader from '../components/Loader';



const Vocabulary = () => {
  const { state, dispatch } = useOutletContext<stateContext>()
  useEffect(() => {
    Promise.all([getUserInfo(), getVocabularies()]).then(values => {
      console.log(values);
      dispatch({ type: actionTypes.SET_USER, payload: { user: values[0].data } })
      dispatch({ type: actionTypes.GET_VOCABULARIES, payload: { vocabularies: values[1].data } })
      dispatch({ type: actionTypes.LOADED, payload: {} })
    }).catch(e => {
      toast.error(e.response.data?.detail)
    })
  }, [])
  return (
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
        {state.loading ? <Loader /> : <><Paper>
          <Badge badgeContent={state.vocabularies.length} color={"primary"}>
            <SideMenu />
          </Badge>
        </Paper>
          <Paper
            style={{
              flex: "1",
            }}
          >
            <MainContent />
          </Paper></>}
      </Stack>
    </Container>
  )
}

export default Vocabulary