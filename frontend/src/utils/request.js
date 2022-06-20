import axios from "axios";

export const endpoint = `http://127.0.0.1:5000`;

const request = axios.create({
  baseURL: endpoint,
  timeout: 6000,
});

export default request;
