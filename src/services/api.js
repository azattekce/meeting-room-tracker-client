import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';  // FastAPI adresi

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 🍪 Cookie'yi otomatik gönderir
});



// Kullanıcı İşlemleri
export const getUsers = () => api.get('/users');
export const addUser = (user) => api.post('/users', user);
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const login = (formData) => api.post('/login',formData);
export const getMe = () => api.get('/me');
export const logout = () => api.post('/logout');

// Rol İşlemleri
export const getRoles = () => api.get('/roles');
export const getRole = (roleId) => api.get(`/roles/${roleId}`);
export const addRole = (role) => api.post('/roles', role);
export const updateRole = (roleId, role) => api.put(`/roles/${roleId}`, role);
export const deleteRole = (roleId) => api.delete(`/roles/${roleId}`);


//Kullanıcı Ve Rol İşlemleri
export const getUserRoles = () => api.get('/user_roles');
export const getUserRole = (userRoleId) => api.get(`/user_roles/${userRoleId}`);
export const addUserRole = (userRole) => api.post('/user_roles', userRole);
export const updateUserRole = (userRoleId, userRole) => api.put(`/user_roles/${userRoleId}`, userRole);
export const deleteUserRole = (userRoleId) => api.delete(`/user_roles/${userRoleId}`);
export const getUserRolesByUser = (userId) => api.get(`/user_roles/${userId}/roles`);



// Toplantı Odası İşlemleri
export const getRooms = () => api.get('/rooms');
export const getRoom = (roomId) => api.get(`/rooms/${roomId}`);
export const addRoom = (room) => api.post('/rooms', room);
export const updateRoom = (roomId, room) => api.put(`/rooms/${roomId}`, room);
export const deleteRoom = (roomId) => api.delete(`/rooms/${roomId}`);




// Toplantı İşlemleri
export const getMeetings = () => api.get('/meetings');
export const getMeeting = (meetingId) => api.get(`/meetings/${meetingId}`);
export const addMeeting = (meeting) => api.post('/meetings', meeting);
export const updateMeeting = (meetingId, meeting) => api.put(`/meetings/${meetingId}`, meeting);
export const deleteMeeting = (meetingId) => api.delete(`/meetings/${meetingId}`);



// Katılımcı İşlemleri
export const getParticipants = (meetingId) => api.get(`/meetings/${meetingId}/participants`);
export const addParticipant = (meetingId, participant) => api.post(`/meetings/${meetingId}/participants`, participant);
export const updateParticipantStatus = (participantId, status) => api.put(`/participants/${participantId}`, { status });
