import React, { useState, useEffect } from "react";
import { Table, Alert, Button } from 'react-bootstrap';
import axios from 'axios';

function TesteProduto() {
    const [groupedProducts, setGroupedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Token não encontrado. Faça login novamente.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/v1/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const products = response.data.data;
                console.log(products);
                const parentProducts = products.filter(p => p.category);
                const variationProducts = products.filter(p => !p.category);

                const grouped = parentProducts.map(parent => {
                    const variations = variationProducts.filter(v => v.name.startsWith(parent.name));
                    return {
                        ...parent,
                        variations
                    };
                });

                setGroupedProducts(grouped);
            } catch (err) {
                setError(err.response?.data?.message || 'Erro ao buscar produtos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleRow = (productId) => {
        setExpandedRows(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    if (loading) {
        return <div className="container mt-4"><Alert variant="info">Carregando produtos...</Alert></div>;
    }

    if (error) {
        return <div className="container mt-4"><Alert variant="danger">{error}</Alert></div>;
    }
console.log(groupedProducts)
    return (
        <div className="container mt-4">
            <h3>Produtos</h3>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço de Venda</th>
                            <th>Estoque</th>
                            <th>Categoria</th>
                            <th>SKU</th>
                            <th>Criado em</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedProducts.map(product => (
                            <React.Fragment key={product.id}>
                                <tr >
                                    <td>
                                        {product.variations && product.variations.length > 0 && (
                                            <Button
                                                variant="link"
                                                onClick={() => toggleRow(product.id)}
                                            >
                                                {expandedRows[product.id] ? '-' : '+'}
                                            </Button>
                                        )}
                                    </td>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.selling_price)}</td>
                                    <td>{product.stock_quantity}</td>
                                    <td>{product.category}</td>
                                    <td>{product.sku}</td>
                                    <td>{new Date(product.created_at).toLocaleDateString('pt-BR')}</td>
                                </tr>
                                {expandedRows[product.id] && product.variations && product.variations.length > 0 && (
                                    <tr>
                                        <td colSpan="8">
                                            <div style={{ paddingLeft: '20px' }}>
                                                <h5>Variações</h5>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Nome</th>
                                                            <th>Preço de Venda</th>
                                                            <th>Estoque</th>
                                                            <th>SKU</th>
                                                            <th>Criado em</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {product.variations.map(variation => (
                                                            <tr key={variation.id}>
                                                                <td>{variation.id}</td>
                                                                <td>{variation.name}</td>
                                                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(variation.selling_price)}</td>
                                                                <td>{variation.stock_quantity}</td>
                                                                <td>{variation.sku}</td>
                                                                <td>{new Date(variation.created_at).toLocaleDateString('pt-BR')}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TesteProduto;