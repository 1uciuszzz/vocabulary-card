import request from "./request";
import { getToken } from './auth';


interface SendVocabulary {
  "spelling": string,
  "meaning": string,
  "sentence": string,
  "origin": string
}

export const createVocabulary = (vocabulary: SendVocabulary) => {
  return request.post(`/vocabulary/`, vocabulary, {
    headers: { Authorization: getToken() as string }
  });
};

export const deleteVocabulary = (id: string) => {
  return request.delete(`/vocabulary/${id}`, {
    headers: { Authorization: getToken() as string }
  });
};

export const updateVocabulary = (id: string, vocabulary: SendVocabulary) => {
  return request.put(`/vocabulary/${id}`, vocabulary, {
    headers: { Authorization: getToken() as string }
  });
};

export const getVocabularies = () => {
  return request.get(`/vocabulary/`, {
    headers: { Authorization: getToken() as string }
  });
};

export const masterVocabulary = (id: string) => {
  return request.patch(`/vocabulary/master/${id}`, null, {
    headers: { Authorization: getToken() as string }
  });
};

export const signIn = (payload: FormData) => {
  return request.post(`/auth/`, payload)
}

export const getUserInfo = () => {
  return request.get(`/auth/`, {
    headers: { Authorization: getToken() as string }
  })
}
