import axios from "axios";

export const endpoint = `https://qn6vp9.deta.dev:443/api/v1`;

const request = axios.create({
  baseURL: endpoint,
  timeout: 6000,
});

export default request;
