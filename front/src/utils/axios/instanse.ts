import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000, // 요청 타임아웃(ms)
  headers: {
    'Content-Type': 'application/json', // 요청 헤더
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
  },
  withCredentials: true,
});
