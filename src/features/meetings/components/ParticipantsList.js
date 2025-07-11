// src/features/meetings/components/ParticipantsList.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import { getUsers } from '../../../api/userService';

const ParticipantsList = ({ meetingId }) => {
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Participants ve users'ı paralel olarak yükle
        const [participantsResponse, usersResponse] = await Promise.all([
          axios.get(`http://localhost:8000/meetings/${meetingId}/participants`),
          getUsers()
        ]);        
        
        setParticipants(participantsResponse.data);
        setUsers(usersResponse.data);
      } catch (err) {
        setError('Katılımcılar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (meetingId) {
          fetchData();
    }
  }, [meetingId]);

  if (!meetingId) {
    return null;
  }

  if (loading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-3 border-danger">
        <Card.Body className="text-danger">
          {error}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-3">
      <Card.Header as="h5">Katılımcılar</Card.Header>
      <Card.Body>
        {participants.length === 0 ? (
          <p className="text-muted">Bu toplantı için katılımcı bulunamadı.</p>
        ) : (
          <div className="participants-list">
            {participants.map((participant, index) => {
              // Unique key oluştur - participant.user_id varsa onu kullan, yoksa index kullan
              const key = participant.user_id ? `participant-${participant.user_id}` : `participant-${index}`;
              
              // User bilgisini bul
              const user = users.find(u => u.user_id === participant.user_id);
              const userName = user ? `${user.first_name} ${user.last_name}` : `User ${participant.user_id}`;
              
              return (
                <Badge 
                  key={key} // Unique key prop'u ekle
                  variant="secondary" 
                  className="me-1 mb-1"
                >
                  {userName}
                </Badge>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ParticipantsList;