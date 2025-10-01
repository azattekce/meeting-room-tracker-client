// src/features/meetings/components/ParticipantsList.js
import React, { useEffect, useState } from 'react';
import { Card, Spinner, Badge } from 'react-bootstrap';
import { useMeetingsCrud } from '../hooks/useMeetingsCrud';

// Note: this component now reads participants & users from the meetings slice via useMeetingsCrud

const ParticipantsList = ({ meetingId }) => {
  const { loadParticipants, participants: participantsMap, users, loadUsers } = useMeetingsCrud();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await loadUsers();
        await loadParticipants(meetingId);
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
        {(!participantsMap || !participantsMap[meetingId] || participantsMap[meetingId].length === 0) ? (
          <p className="text-muted">Bu toplantı için katılımcı bulunamadı.</p>
        ) : (
          <div className="participants-list">
            {participantsMap[meetingId].map((participant, index) => {
              const key = participant.user_id ? `participant-${participant.user_id}` : `participant-${index}`;
              const user = users.find(u => u.user_id === participant.user_id);
              const userName = user ? `${user.firstname || user.first_name} ${user.lastname || user.last_name}` : `User ${participant.user_id}`;
              return (
                <Badge key={key} bg="secondary" className="me-1 mb-1">{userName}</Badge>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ParticipantsList;