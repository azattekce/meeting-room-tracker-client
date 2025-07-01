// src/api/httpClient.js

import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:8000', // ✅ API base URL — ihtiyaca göre değiştir
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Eğer cookie/tabanlı auth kullanıyorsan
});

export default httpClient;
