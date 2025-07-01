import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const MyToastComponent = ({ toast, setToast }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        delay={3000}
        autohide
        bg={toast.variant}
      >
        <Toast.Header>
          <strong className="me-auto">Bilgilendirme</strong>
          <small>Şimdi</small>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

// Add toast utility functions
MyToastComponent.successToast = (message) => {
  return {
    show: true,
    variant: 'success',
    message
  };
};

MyToastComponent.errorToast = (message) => {
  return {
    show: true,
    variant: 'danger',
    message
  };
};

MyToastComponent.infoToast = (message) => {
  return {
    show: true,
    variant: 'info',
    message
  };
};

MyToastComponent.warningToast = (message) => {
  return {
    show: true,
    variant: 'warning',
    message
  };
};

export default MyToastComponent;
