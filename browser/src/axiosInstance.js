import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:6500/',
  withCredentials: true,
  timeout: 1000,
});

export default instance;