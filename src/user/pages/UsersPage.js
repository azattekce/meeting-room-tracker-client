// pages/UsersPage.jsx
import React, { useState } from 'react';
import { Button, Toast, ToastContainer, Modal } from 'react-bootstrap';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import { useUsers } from '../hooks/useUsers';
import { userService } from '../userService';

const UsersPage = () => {
  const { users, roles, loadUsers } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '', firstname: '', lastname: '', gsm: '',
    email: '', password: '', role_type: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', variant: 'info' });
  const [validationErrors, setValidationErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, userId: null });

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Zorunlu';
    if (!formData.firstname) errors.firstname = 'Zorunlu';
    if (!formData.lastname) errors.lastname = 'Zorunlu';
    if (!formData.gsm) errors.gsm = 'Zorunlu';
    if (!formData.email) errors.email = 'Zorunlu';
    if (!formData.role_type) errors.role_type = 'Zorunlu';
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        await userService.updateUser(editingUser.user_id, formData);
        setToast({ show: true, message: 'Güncellendi', variant: 'success' });
      } else {
        await userService.addUser(formData);
        setToast({ show: true, message: 'Eklendi', variant: 'success' });
      }
      loadUsers();
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      setToast({ show: true, message: 'Hata oluştu', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(deleteConfirm.userId);
      loadUsers();
      setToast({ show: true, message: 'Silindi', variant: 'success' });
    } catch {
      setToast({ show: true, message: 'Silinirken hata', variant: 'danger' });
    } finally {
      setDeleteConfirm({ show: false, userId: null });
    }
  };

  return (
    <div>
      <h2>Kullanıcılar</h2>
      <Button onClick={() => setShowForm(true)}>Yeni Kullanıcı</Button>
      <UserTable users={users} onEdit={handleEdit} onDelete={(id) => setDeleteConfirm({ show: true, userId: id })} />

      <UserForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleSubmit}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        validationErrors={validationErrors}
        roles={roles}
        title={editingUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı'}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast bg={toast.variant} show={toast.show} onClose={() => setToast({ ...toast, show: false })} delay={3000} autohide>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={deleteConfirm.show} onHide={() => setDeleteConfirm({ show: false, userId: null })}>
        <Modal.Header closeButton><Modal.Title>Sil</Modal.Title></Modal.Header>
        <Modal.Body>Silmek istediğinize emin misiniz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirm({ show: false, userId: null })}>İptal</Button>
          <Button variant="danger" onClick={handleDelete}>Sil</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersPage;
