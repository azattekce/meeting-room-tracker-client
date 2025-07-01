// userService.js
import httpClient from './httpClient';

export const getUsers = () => httpClient.get('/users');
export const addUser = (data) => httpClient.post('/users', data);
export const deleteUser = (id) => httpClient.delete(`/users/${id}`);
export const getRoles = () => httpClient.get('/roles');
export const updateUser = (id, data) => httpClient.put(`/users/${id}`, data);
