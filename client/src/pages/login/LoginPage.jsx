import { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Button, Image } from 'react-bootstrap'; 
import './LoginPage.css';
import logoEstilo from '../../assets/logoEstilo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email: email,
        password: password
      });

      console.log('Login com sucesso!', response.data);
      //alert('Login realizado com sucesso!');

      // Próximos passos: salvar o token e redirecionar
      localStorage.setItem('token', response.data.data.token);
      window.location.href = '/index';

    } catch (error) {
      console.error('Erro no login:', error.response.data.message);
      alert('Erro no login: ' + error.response.data.message);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container"> 
        <Row className="g-0 w-100">
          <Col md={6} className="form-section p-5">
            <div className="form-container">
              
              <h2>Seja bem-vindo</h2>
              <p className="text-muted mb-4">Faça login para utilizar o sistema</p>
              
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {/* ***** LINHA CORRIGIDA ABAIXO ***** */}
                  <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    size="lg" 
                    className='rounded-pill bg-light ps-4' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Control 
                    type="password" 
                    placeholder="Senha" 
                    size="lg" 
                    className='rounded-pill bg-light ps-4' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                
                <a href="#" className="forgot-password-link mt-1">Esqueci a senha</a>

                <div className="d-grid">
                  <Button type="submit" size="lg" variant="danger" className="btn-login rounded-pill">
                    Entrar
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">Entre em Contato</p>
                <div className="social-icons">
                  <a href="#" className="mx-2 text-secondary">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a href="#" className="mx-2 text-secondary">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                  <a href="#" className="mx-2 text-secondary">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col md={6} className="d-none d-md-flex branding-section p-5">
             <Image src={logoEstilo} className="logo-image" />
          </Col>
        </Row>
      </div>
    </div> 
  );
}

export default LoginPage;