// src/features/meetings/components/ParticipantsList.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ParticipantsList = ({ meetingId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/meetings/${meetingId}/participants`);
        setParticipants(response.data);
      } catch (err) {
        setError('Katılımcılar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (meetingId) {
      fetchParticipants();
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
          <ListGroup>
            {participants.map((participant) => (
              <ListGroup.Item 
                key={participant.id} 
                className="d-flex justify-content-between align-items-center"
              >
                {participant.user_name || participant.user_id} 
                <span className={`badge bg-${
                  participant.status === 'accepted' ? 'success' : 
                  participant.status === 'declined' ? 'danger' : 'warning'
                }`}>
                  {participant.status === 'accepted' ? 'Kabul Edildi' : 
                   participant.status === 'declined' ? 'Reddedildi' : 'Davet Edildi'}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default ParticipantsList;