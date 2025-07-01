// src/api/roomService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getRooms = () => api.get('/rooms');
export const getRoom = (id) => api.get(`/rooms/${id}`);
export const addRoom = (room) => api.post('/rooms', room);
export const updateRoom = (id, room) => api.put(`/rooms/${id}`, room);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);