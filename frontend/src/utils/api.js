import request from "./request";
const add_word = (word) => {
  return request.post(`/word`, word);
};

const del_word = async (id) => {
  return await request.delete(`/word/${id}`);
};

const update_word = async (id, word) => {
  return await request.put(`/word/${id}`, word);
};
const get_word = async (id) => {
  return await request.get(`/word/${id}`);
};

const get_words = () => {
  try {
    return request.get(`/words`);
  } catch (e) {
    console.log(e);
  }
};

const master = async (id) => {
  return await request.put(`/word/master/${id}`);
};
export { add_word, del_word, update_word, get_word, get_words, master };
