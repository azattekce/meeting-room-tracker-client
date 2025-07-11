import { Modal } from 'react-bootstrap';
import MeetingForm from './MeetingForm';


const EditModal = ({ showEditModal, setShowEditModal, formData, rooms, users, validationErrors, setFormData, handleEditSubmit, loading }) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Toplantıyı Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MeetingForm
          formData={formData}
          rooms={rooms}
          users={users}
          validationErrors={validationErrors}
          setFormData={setFormData}
          onSubmit={handleEditSubmit}
          loading={loading}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;