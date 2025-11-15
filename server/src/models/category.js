const pool = require('../config/database');

class Category {
    static async findAll() {
        try {
            const query = 'SELECT * FROM category ORDER BY name ASC';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Category;
