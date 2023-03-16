import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 기본 URL
  // baseURL: process.env.REACT_APP_API_BASE_URL, // 기본 URL
  timeout: 5000, // 요청 타임아웃(ms)
  headers: {
    'Content-Type': 'application/json', // 요청 헤더
  },
});
