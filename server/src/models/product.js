const pool = require('../config/database');

class Product {
    static async findAll() {
        try {
            const query = `
                SELECT 
                    id,
                    sku,
                    name,
                    selling_price,
                    cost_price,
                    category,
                    stock_quantity,
                    created_at
                FROM products 
                ORDER BY created_at DESC
            `;

            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async findBySku (sku) {
        try {
            const query = 'SELECT id, sku, name, selling_price, cost_price, category, stock_quantity, created_at from products where sku = $1';
            const result = await pool.query(query, [sku])
            return result.rows[0]
        } catch (error) {
            throw error;
        }
    }

    static async create({sku, name, selling_price, cost_price, category, stock_quantity}) {
        try {
            const query = `
                INSERT INTO products (sku, name, selling_price, cost_price, category, stock_quantity)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, sku, name, selling_price, cost_price, category, stock_quantity, created_at`;

            const result = await pool.query(query, [sku, name, selling_price, cost_price, category, stock_quantity])
            return result.rows[0]
        } catch (error) {
            throw error;
            
        }
    }

    /**
     * Create a product with its variations in a single transaction
     * @param {Object} parentData - Parent product data
     * @param {Array} variationsArray - Array of variation objects
     * @returns {Object} Parent product with nested variations array
     */
    static async createWithVariations (parentData, variationsArray) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const parentQuery = `
                INSERT INTO products (sku, name, selling_price, cost_price, category, stock_quantity)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, sku, name, selling_price, cost_price, category, stock_quantity, created_at
            `;

            const parentResult = await client.query(parentQuery, [
                parentData.sku,
                parentData.name,
                parentData.selling_price,
                parentData.cost_price,
                parentData.category,
                parentData.stock_quantity
            ]);

            const parentProduct = parentResult.rows[0]
            const parentId = parentProduct.id

            // create all variations using parent ID
            const createdVariations = [];
            
            for (const variation of variationsArray) {
                const variationQuery = `
                    INSERT INTO product_variations (parent_product_id, sku, name, selling_price, cost_price, stock_quantity)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id, sku, name, selling_price, cost_price, stock_quantity, created_at
                `;

                const variationResult = await client.query(variationQuery, [
                    parentId, // Use parent's ID as foreign key
                    variation.sku,
                    variation.name,
                    variation.selling_price,
                    variation.cost_price,
                    variation.stock_quantity
                ]);

                createdVariations.push(variationResult.rows[0]);
            }

            await client.query('COMMIT')

            return {
                ...parentProduct,
                variations: createdVariations
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release()
        }
    }
}

module.exports = Product;