// src/features/room/components/RoomForm.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RoomForm = ({ room, handleEdit, handleDelete, canEdit = true }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-info text-white">
        <strong>{room.room_name}</strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Konum:</strong> {room.location}<br />
          <strong>Kapasite:</strong> {room.capacity} kişi<br />
          <strong>Oda Tipi:</strong> {room.room_type}
        </Card.Text>
      </Card.Body>
      {canEdit && (
        <Card.Footer className="d-flex justify-content-between">
          <Button size="sm" variant="outline-primary" onClick={() => handleEdit(room)}>
            Düzenle
          </Button>
          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(room.room_id)}>
            Sil
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default RoomForm;