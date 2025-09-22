// src/pages/LoginPage.jsx

// Mantenha todas as importações, MENOS a do Container
import { Row, Col, Form, Button, Image } from 'react-bootstrap'; 
import './LoginPage.css';
import logoEstilo from '../assets/logoEstilo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
  return (
    // TROCA 1: Substitua <Container> por <div>
    <div className="login-container"> 
      {/* Removemos o "p-0" pois a Row agora cuida do layout interno */}
      <Row className="g-0 w-100">
        <Col md={6} className="form-section p-5">
          <div className="form-container">
            
            <h2>Seja bem-vindo</h2>
            <p className="text-muted mb-4">Faça login para utilizar o sistema</p>
            
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="text" placeholder="Nome" size="lg" className='rounded-pill ps-4'/>
              </Form.Group>

              <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Senha" size="lg" className='rounded-pill ps-4'/>
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
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </Col>

        <Col md={6} className="d-none d-md-flex branding-section p-5">
           <Image src={logoEstilo} className="logo-image" />
        </Col>
      </Row>
    {/* TROCA 2: Substitua </Container> por </div> */}
    </div> 
  );
}

export default LoginPage;