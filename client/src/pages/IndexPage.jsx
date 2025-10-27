import { Row, Col, Form, Button, Image } from 'react-bootstrap'; 
import './IndexPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function IndexPage() {
    return (
        <div className="index-container"> 
          <Row className="g-0 w-100">
            <Col md={12} className="content-section p-5">
              <div className="content-container">
                <h2 className='text-center'>Página Inicial</h2>
                <p className="text-muted mb-4">Bem-vindo ao sistema de gerenciamento de inventário!</p>
                            
              </div>
            </Col>
          </Row>
        </div>
    );
}

export default IndexPage;

