import axios from "axios";

const endpoint = `http://localhost:5000`;

const add_word = async (word) => {
  return await axios.post(`${endpoint}/word`, word);
};

const del_word = async (id) => {
  return await axios.delete(`${endpoint}/word/${id}`);
};

const update_word = async (id, word) => {
  return await axios.put(`${endpoint}/word/${id}`, word);
};
const get_word = async (id) => {
  return await axios.get(`${endpoint}/word/${id}`);
};

const get_words = async () => {
  try {
    return await axios.get(`${endpoint}/words`);
  } catch (e) {
    console.log(e);
  }
};

const master = async (id) => {
  return await axios.put(`${endpoint}/word/master/${id}`);
};
export { add_word, del_word, update_word, get_word, get_words, master };
