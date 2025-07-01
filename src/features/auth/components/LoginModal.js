import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import MyToastComponent from "../../common/MyToastComponent"; // Adjust the import path as necessary

const LoginModal = ({ show, handleClose }) => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
    // Only close the modal if there's no error
    if (!error) {
      MyToastComponent.successToast('Giriş başarılı!');
      handleClose();
    } else {
      MyToastComponent.errorToast('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Giriş Yap</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Adresi</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100" variant="primary">Giriş Yap</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
