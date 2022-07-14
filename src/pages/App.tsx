import { useEffect, useReducer, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { actionTypes } from '../constant'
import { GlobalState } from '../interfaces'
import { clearToken } from '../utils/auth'

const reducer = (state: GlobalState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actionTypes.INDEX:
      return {
        ...state,
        currentVocabularyIndex: action.payload.index,
      };
    case actionTypes.NEXT:
      return {
        ...state,
        currentVocabularyIndex: (state.currentVocabularyIndex + 1) % state.vocabularies.length,
      };
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.LOADED:
      return { ...state, loading: false };
    case actionTypes.GET_VOCABULARIES:
      return {
        ...state,
        vocabularies: action.payload.vocabularies,
      };
    case actionTypes.CREATE_VOCABULARY:
      return {
        ...state,
        vocabularies: [action.payload.vocabulary, ...state.vocabularies],
      };
    case actionTypes.DELETE_VOCABULARY:
      return {
        ...state,
        vocabularies: state.vocabularies.filter((vocabulary) => vocabulary.id !== action.payload.id),
      };
    case actionTypes.UPDATE_VOCABULARY:
      return {
        ...state,
        vocabularies: state.vocabularies.map((vocabulary) => {
          if (vocabulary.id === action.payload.vocabulary.id) {
            return action.payload.vocabulary;
          }
          return vocabulary;
        }),
      };
    case actionTypes.MASTER_VOCABULARY:
      return {
        ...state,
        vocabularies: state.vocabularies.map((vocabulary) => {
          if (vocabulary.id === action.payload.id) {
            vocabulary.mastered = true;
            return vocabulary;
          }
          return vocabulary;
        }),
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    case actionTypes.SIGN_OUT:
      clearToken()
      return initialState
    default:
      return state;
  }
}

const initialState: GlobalState = {
  user: {
    id: "",
    role: "",
    username: ""
  },
  vocabularies: [],
  currentVocabularyIndex: 0,
  loading: true
}

const App = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    navigate("/vocabulary", { replace: true })
  }, [])
  return <div>
    <Outlet context={{ state, dispatch }} />
    <ToastContainer />
  </div>
}

export default App