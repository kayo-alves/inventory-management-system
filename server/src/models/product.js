const pool = require('../config/database');

class Product {
    static async findAll() {
        try {
            const query = `
                SELECT 
                    id,
                    name,
                    selling_price,
                    cost_price,
                    category,
                    quantity_in_inventory,
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

    // We'll add more methods later (findById, create, update, delete)
}

module.exports = Product;