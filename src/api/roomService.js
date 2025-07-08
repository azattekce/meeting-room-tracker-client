// src/api/roomService.js

import httpClient from './httpClient';

export const getRooms = () => httpClient.get('/rooms');
export const getRoom = (id) => httpClient.get(`/rooms/${id}`);
export const addRoom = (room) => httpClient.post('/rooms', room);
export const updateRoom = (id, room) => httpClient.put(`/rooms/${id}`, room);
export const deleteRoom = (id) => httpClient.delete(`/rooms/${id}`);