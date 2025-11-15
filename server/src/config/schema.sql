-- Tabela de Usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela de Produtos (Produtos Pai)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    selling_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    category_id INTEGER REFERENCES category(id),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Variações de Produtos
CREATE TABLE product_variations (
    id SERIAL PRIMARY KEY,
    parent_product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    selling_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserir algumas categorias de exemplo
INSERT INTO category (name) VALUES ('Calçados'), ('Acessórios'), ('Roupas');

-- Inserir um produto pai (Sapato)
-- O ID do produto inserido será 1
INSERT INTO products (name, sku, selling_price, cost_price, category_id, stock_quantity)
VALUES ('Sapato Social Couro', 'SAP-SOC-001', 299.90, 150.00, 1, 0); -- Estoque do pai é 0, o estoque fica nas variações

-- Inserir variações para o Sapato Social (parent_product_id = 1)
INSERT INTO product_variations (parent_product_id, name, sku, selling_price, cost_price, stock_quantity)
VALUES
(1, 'Sapato Social Couro - 40', 'SAP-SOC-001-40', 299.90, 150.00, 10),
(1, 'Sapato Social Couro - 42', 'SAP-SOC-001-42', 299.90, 150.00, 15);

-- Inserir um segundo produto pai (Cinto) sem variações
-- O ID do produto inserido será 2
INSERT INTO products (name, sku, selling_price, cost_price, category_id, stock_quantity)
VALUES ('Cinto de Couro', 'CIN-COU-001', 79.90, 35.00, 2, 50);
