import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Card, InputGroup } from 'react-bootstrap';
import axios from 'axios';

export default function ProductCreateModal({ show, onHide }) {
  // State for the parent product
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [selling_price, setSellingPrice] = useState('');
  const [cost_price, setCostPrice] = useState('');
  const [stock_quantity, setStockQuantity] = useState('');
  const [category_id, setCategoryId] = useState('');

  // State for variations
  const [hasVariations, setHasVariations] = useState(false);
  const [variations, setVariations] = useState([]);
  
  // State for categories dropdown
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the modal is shown
    if (show) {
      const fetchCategories = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/v1/categories', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCategories(response.data.data);
        } catch (error) {
          console.error('Erro ao buscar categorias:', error);
          // Optionally, show an alert to the user
          // alert('Não foi possível carregar as categorias.');
        }
      };

      fetchCategories();
    }
  }, [show]); // Rerun effect if 'show' changes


  const handleAddVariation = () => {
    setVariations([...variations, { sku: '', name: '', selling_price: '', cost_price: '', stock_quantity: '' }]);
  };

  const handleRemoveVariation = (index) => {
    const newVariations = variations.filter((_, i) => i !== index);
    setVariations(newVariations);
  };

  const handleVariationChange = (index, field, value) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    let payload;

    if (hasVariations) {
      payload = {
        sku,
        name,
        selling_price: parseFloat(selling_price),
        cost_price: parseFloat(cost_price),
        category_id: parseInt(category_id),
        stock_quantity: 0, // Parent stock is 0 when there are variations
        variations: variations.map(v => ({
          ...v,
          selling_price: parseFloat(v.selling_price),
          cost_price: parseFloat(v.cost_price),
          stock_quantity: parseInt(v.stock_quantity)
        }))
      };
    } else {
      payload = {
        sku,
        name,
        selling_price: parseFloat(selling_price),
        cost_price: parseFloat(cost_price),
        stock_quantity: parseInt(stock_quantity),
        category_id: parseInt(category_id)
      };
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/v1/products', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert('Produto criado com sucesso!');
      onHide();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar produto:', error.response?.data?.message || error.message);
      alert('Erro ao criar produto: ' + (error.response?.data?.message || 'Verifique os dados e tente novamente.'));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateProduct}>
          <h5>Dados do Produto Principal</h5>
          <hr/>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formProductSKU">
                <Form.Label>SKU (Código)</Form.Label>
                <Form.Control type="text" placeholder="Ex: SAP-001" value={sku} onChange={(e) => setSku(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control type="text" placeholder="Ex: Sapato Social" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formProductSellingPrice">
                <Form.Label>Preço de Venda</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="Ex: 299.90" value={selling_price} onChange={(e) => setSellingPrice(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formProductCostPrice">
                <Form.Label>Preço de Custo</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="Ex: 150.00" value={cost_price} onChange={(e) => setCostPrice(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formProductQuantity">
                <Form.Label>Quantidade em Estoque</Form.Label>
                <Form.Control type="number" placeholder="Ex: 15" value={stock_quantity} onChange={(e) => setStockQuantity(e.target.value)} required disabled={hasVariations} />
                 {hasVariations && <Form.Text className="text-muted">O estoque é gerenciado nas variações.</Form.Text>}
              </Form.Group>
            </Col>
            <Col md={6}>
               <Form.Group className="mb-3" controlId="formProductCategoryId">
                <Form.Label>Categoria</Form.Label>
                <Form.Select value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formHasVariations">
            <Form.Check type="checkbox" label="Este produto possui variações" checked={hasVariations} onChange={(e) => setHasVariations(e.target.checked)} />
          </Form.Group>

          {hasVariations && (
            <>
              <h5 className="mt-4">Variações do Produto</h5>
              <hr/>
              {variations.map((variation, index) => (
                <Card className="mb-3" key={index}>
                  <Card.Body>
                    <Row>
                       <Col xs={10}>
                         <h6>Variação {index + 1}</h6>
                       </Col>
                       <Col xs={2} className="text-end">
                          <Button variant="danger" size="sm" onClick={() => handleRemoveVariation(index)}>X</Button>
                       </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>SKU da Variação</Form.Label>
                          <Form.Control type="text" placeholder="Ex: SAP-001-BR" value={variation.sku} onChange={(e) => handleVariationChange(index, 'sku', e.target.value)} required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome da Variação</Form.Label>
                          <Form.Control type="text" placeholder="Ex: Sapato Social - Branco" value={variation.name} onChange={(e) => handleVariationChange(index, 'name', e.target.value)} required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Preço de Venda</Form.Label>
                          <Form.Control type="number" step="0.01" value={variation.selling_price} onChange={(e) => handleVariationChange(index, 'selling_price', e.target.value)} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Preço de Custo</Form.Label>
                          <Form.Control type="number" step="0.01" value={variation.cost_price} onChange={(e) => handleVariationChange(index, 'cost_price', e.target.value)} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Estoque</Form.Label>
                          <Form.Control type="number" value={variation.stock_quantity} onChange={(e) => handleVariationChange(index, 'stock_quantity', e.target.value)} required />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="outline-primary" onClick={handleAddVariation}>
                Adicionar Variação
              </Button>
            </>
          )}
          
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Produto
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
