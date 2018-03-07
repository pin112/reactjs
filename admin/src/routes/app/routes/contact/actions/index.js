import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json'
  }
});
