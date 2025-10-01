// src/api/meetingService.js
import httpClient from './httpClient';

export const getMeetings = () => httpClient.get('/meetings');
export const getMeeting = (id) => httpClient.get(`/meetings/${id}`);
export const addMeeting = (meeting) => httpClient.post('/meetings', meeting);
export const updateMeeting = (id, meeting) => httpClient.put(`/meetings/${id}`, meeting);
export const deleteMeeting = (id) => httpClient.delete(`/meetings/${id}`);
export const getParticipants = (id) => httpClient.get(`/meetings/${id}/participants`);
export const addParticipant = (id, participant) => httpClient.post(`/meetings/${id}/participants`, participant);
export const deleteParticipant = (meetingId, participantId) => httpClient.delete(`/meetings/${meetingId}/participants/${participantId}`);
