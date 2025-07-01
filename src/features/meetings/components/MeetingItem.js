import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { formatDate } from '../../../utils/dateUtils';

const MeetingItem = ({ meeting, room, onViewParticipants, onEdit, onDelete, isAdmin }) => {
  const isPast = new Date(meeting.end_time) < new Date();
  const isActive = new Date(meeting.start_time) <= new Date() && new Date(meeting.end_time) >= new Date();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className={`d-flex justify-content-between align-items-center ${isActive ? 'bg-success text-white' : isPast ? 'bg-secondary text-white' : 'bg-primary text-white'}`}>
        <span>{meeting.meeting_title}</span>
        {isActive && <Badge bg="warning">Aktif</Badge>}
        {isPast && <Badge bg="dark">Tamamlandı</Badge>}
        {!isActive && !isPast && <Badge bg="info">Planlandı</Badge>}
      </Card.Header>
      
      <Card.Body>
        <div className="mb-2">
          <strong>Başlangıç:</strong> {formatDate(meeting.start_time)}
        </div>
        <div className="mb-2">
          <strong>Bitiş:</strong> {formatDate(meeting.end_time)}
        </div>
        <div className="mb-3">
          <strong>Oda:</strong> {room ? room.room_name : 'Belirtilmemiş'}
        </div>
        
        <div className="d-flex gap-2">
          <Button 
            size="sm" 
            variant="outline-primary"
            onClick={() => onViewParticipants(meeting.meeting_id)}
          >
            Katılımcılar
          </Button>
          
          {isAdmin && (
            <>
              <Button 
                size="sm" 
                variant="outline-secondary"
                onClick={() => onEdit(meeting)}
                disabled={isPast}
              >
                Düzenle
              </Button>
              
              <Button 
                size="sm" 
                variant="outline-danger"
                onClick={() => onDelete(meeting.meeting_id)}
              >
                İptal Et
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MeetingItem;