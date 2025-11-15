import React from 'react'
import logoEstilo from '../assets/logoEstilo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBoxOpen, faUser, faChartPie, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// Recebe isOpen e onClose
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation(); // Hook para obter a localização atual

  // Adiciona a classe 'open' se isOpen for true
  const sidebarClasses = `sidebar d-flex flex-column px- py-5 text-white ${isOpen ? 'open' : ''}`;

  const handleLogout = () => {
    // Limpa o token de autenticação ou qualquer outra informação de sessão
    localStorage.removeItem('token');
    // Redireciona para a página de login
    window.location.href = '/login';
  };

  // Função para verificar se o link deve estar ativo
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={sidebarClasses}>
      <div className="brand p-4">
        <Row className="logo-text justify-content-center">
          <Col xs="auto">
            <Image src={logoEstilo} className="logo-img" rounded />
          </Col>
        </Row>
      </div>

      <nav className="nav flex-column p-2 flex-grow-1" onClick={onClose}>
        <Link to="/index" className={`nav-link text-white d-flex align-items-center py-2 ${isActive('/index') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHome} className="me-2" /> Início
        </Link>
        <Link to="/testeProduto" className={`nav-link text-white d-flex align-items-center py-2 ${isActive('/testeProduto') ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Produtos
        </Link>
        <Link
          to="#"
          onClick={(e) => e.preventDefault()}
          className={`nav-link text-white d-flex align-items-center py-2 ${isActive('/users') ? 'active' : ''}`}
          style={{ cursor: 'not-allowed', opacity: 0.6 }}
        >
          <FontAwesomeIcon icon={faUser} className="me-2" /> Usuário
        </Link>

        <Link
          to="#"
          onClick={(e) => e.preventDefault()}
          className={`nav-link text-white d-flex align-items-center py-2 ${isActive('/dashboard') ? 'active' : ''}`}
          style={{ cursor: 'not-allowed', opacity: 0.6 }}
        >
          <FontAwesomeIcon icon={faChartPie} className="me-2" /> Dashboard
        </Link>
      </nav>

      <div className="mt-auto p-3">
        <Button variant="outline-light" className="w-100" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="me-2" /> Sair
        </Button>
      </div>
    </aside>
  );
}