import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./TesteProduto.css";

function TesteProduto() {
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token não encontrado. Faça login novamente.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setGroupedProducts(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleRow = (productId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading)
    return (
      <div className="container mt-4">
        <Alert variant="info">Carregando produtos...</Alert>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="container w-100 mt-5">
      <div className="tabela-container shadow-sm rounded-3 p-3 bg-white">
        <Table hover borderless responsive className="align-middle tabela-produtos">
          <thead>
            <tr>
              <th style={{ width: "40px" }}></th>
              <th>ID</th>
              <th>SKU</th>
              <th>Nome do Produto</th>
              <th className="text-end">Preço de Venda</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {groupedProducts.map((product) => (
              <React.Fragment key={product.id}>
                <tr className="linha-principal">
                  <td className="text-center">
                    {product.variations?.length > 0 && (
                      <Button
                        variant="link"
                        className="p-0 toggle-icon"
                        onClick={() => toggleRow(product.id)}
                      >
                        <FontAwesomeIcon
                          icon={
                            expandedRows[product.id]
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </Button>
                    )}
                  </td>
                  <td>{product.id}</td>
                  <td className="text-muted">{product.sku}</td>
                  <td>{product.name}</td>
                  <td className="text-end ">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.selling_price)}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.stock_quantity}</td>
                  <td className="text-center">
                    <FontAwesomeIcon icon={faCog} />
                  </td>
                </tr>

                {expandedRows[product.id] &&
                  product.variations?.map((variation) => (
                    <tr key={variation.id} className="linha-variacao">
                      <td></td>
                      <td className="text-muted">{variation.id}</td>
                      <td className="text-muted">{variation.sku}</td>
                      <td>{variation.name}</td>
                      <td className="text-end">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(variation.selling_price)}
                      </td>
                      <td>{product.category}</td>
                      <td>{variation.stock_quantity}</td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCog} />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TesteProduto;
