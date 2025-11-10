import React from 'react'
import logoEstilo from '../assets/logoEstilo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBoxOpen, faUser, faChartPie, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Form, Button, Image } from 'react-bootstrap'; 

// Recebe isOpen e onClose
export default function Sidebar({ isOpen, onClose }) {
  
  // Adiciona a classe 'open' se isOpen for true
  const sidebarClasses = `sidebar d-flex flex-column px- py-5 text-white ${isOpen ? 'open' : ''}`;

  return (
    <aside className={sidebarClasses}>
      <div className="brand p-4">
        <Row className="logo-text justify-content-center">
          <Col xs="auto">
            <Image src={logoEstilo} className="logo-img" rounded />
          </Col>
        </Row>
      </div>

      <Form className="flex-grow-1">
        <nav className="nav flex-column p-2" onClick={onClose}>
          <Button variant="link" className="nav-link text-white d-flex align-items-center py-2">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Início
          </Button>
          <Button variant="link" className="nav-link active text-white d-flex align-items-center py-2">
            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Produtos
          </Button>
          <Button variant="link" className="nav-link text-white d-flex align-items-center py-2">
            <FontAwesomeIcon icon={faUser} className="me-2" /> Usuário
          </Button>
          <Button variant="link" className="nav-link text-white d-flex align-items-center py-2">
            <FontAwesomeIcon icon={faChartPie} className="me-2" /> Dashboard
          </Button>
        </nav>
      </Form>

      <div className="mt-auto p-3">
        <Button variant="outline-light" className="w-100" onClick={onClose}>
          <FontAwesomeIcon icon={faRightFromBracket} className="me-2" /> Sair
        </Button>
      </div>
    </aside>
  );
}