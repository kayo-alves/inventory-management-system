import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBoxOpen, faChartLine, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./IndexPage.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { getUserEmailFromToken } from "../../utils/auth.js";

function IndexPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = getUserEmailFromToken();
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-root d-flex">
      {sidebarOpen && (
        <div className="sidebar-overlay d-lg-none" onClick={closeSidebar}></div>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="content flex-grow-1">
        <Topbar onMenuClick={toggleSidebar} title="Início" userEmail={userEmail} />

        <main className="p-4">
          <h1 className="fw-bold mb-3">Bem-vindo à Estilo Calçados & Acessórios!</h1>
          <p className="text-secondary">
            Use a barra de navegação à esquerda para gerenciar produtos, usuários e ver o dashboard.
          </p>

          <Row className="mt-4">
            
            {/* Card de Produtos */}
            <Col md={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100 text-center card-hover">
                <Card.Body>
                  <FontAwesomeIcon icon={faBoxOpen} size="3x" className="mb-3" style={{color: "#6f0f17",}} />
                  <Card.Title className="fw-bold">Produtos</Card.Title>
                  <Card.Text className="text-muted">
                    Gerencie os produtos, atualize preços e mantenha o estoque
                  </Card.Text>
                  <Link to="/testeProduto">
                    <Button variant="primary"  style={{backgroundColor: "#6f0f17",border: "none"}} >Acessar</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Card de Clientes */}
            <Col md={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100 text-center card-hover">
                <Card.Body>
                  <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3 text-secondary" />
                  <Card.Title className="fw-bold">Clientes</Card.Title>
                  <Card.Text className="text-muted">
                    Em breve será possível visualizar informações dos clientes.
                  </Card.Text>
                  <Button variant="outline-secondary" disabled>
                    Em breve
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Card de Dashboard */}
            <Col md={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100 text-center card-hover">
                <Card.Body>
                  <FontAwesomeIcon icon={faChartLine} size="3x" className="mb-3 text-secondary" />
                  <Card.Title className="fw-bold">Dashboard</Card.Title>
                  <Card.Text className="text-muted">
                    Área de estatísticas e relatórios ainda em desenvolvimento.
                  </Card.Text>
                  <Button variant="outline-secondary" disabled>
                    Em breve
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Alert variant="info" className="mt-4">
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            No momento, apenas a seção <strong>Produtos</strong> está ativa. As demais funcionalidades estão em desenvolvimento.
          </Alert>
        </main>
      </div>
    </div>
  );
}

export default IndexPage;
