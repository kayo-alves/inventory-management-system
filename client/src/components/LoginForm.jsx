// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email,
        password,
      });

      // Lógica de sucesso (ex: redirecionar, salvar token)
      console.log('Login bem-sucedido:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
      console.error('Erro no login:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className="input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <Form.Control
            type="email"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <div className="input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Entrar
      </Button>
    </Form>
  );
};

export default LoginForm;
