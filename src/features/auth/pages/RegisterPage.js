import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const { register, error } = useAuth();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div className="container mt-4">
      <h2>Kayıt Ol</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Ad</Form.Label>
          <Form.Control value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Soyad</Form.Label>
          <Form.Control value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={form.email} type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Şifre</Form.Label>
          <Form.Control value={form.password} type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Form.Group>
        <Button type="submit">Kayıt Ol</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;