import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faChevronUp, faChevronDown, faCog } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ProductsTable() {const [groupedProducts, setGroupedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedRows, setExpandedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = groupedProducts.slice(indexOfFirst, indexOfLast);

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
    <div className="card shadow-sm h-100 w-100" style={{ minHeight: "calc(100vh - 210px)" }}>
      <div className="card-body d-flex flex-column">
        <div className="table-responsive flex-grow-1">
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
              <th>ID</th>
              <th>SKU</th>
              <th>Nome do Produto</th>
              <th>Preço de Venda</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
              <React.Fragment key={product.id}>
                  <tr>
                    <td>
                        {product.variations?.length > 0 && (
                      <Button
                        variant="link"
                        onClick={() => toggleRow(product.id)}
                        className="p-0"
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
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>                    
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.selling_price)}</td>
                    <td>{product.category}</td>
                    <td>{product.stock_quantity}</td>
                    <td className="text-center">
                    <FontAwesomeIcon icon={faCog} />
                  </td>
                  </tr>

                  {expandedRows[product.id] &&
                  product.variations?.map((variation) => (
                    <tr key={variation.id} className="variation-row">
                      <td></td>
                      <td>{variation.id}</td>
                      <td>{variation.sku}</td>
                      <td>{variation.name}</td>
                      <td>
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
          </table>
        </div>

        <div className="pagination-container">
          <Button
            variant="light"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Anterior
          </Button>

          {[...Array(Math.ceil(groupedProducts.length / itemsPerPage)).keys()].map(
            (num) => (
              <Button
                key={num + 1}
                variant={currentPage === num + 1 ? "dark" : "light"}
                size="sm"
                className="mx-1"
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </Button>
            )
          )}

          <Button
            variant="light"
            size="sm"
            disabled={
              currentPage === Math.ceil(groupedProducts.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
    );
}export default ProductsTable;