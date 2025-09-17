const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class user {
    static async create({email, password, name }) {
        try {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const query = `
                INSERT INTO users (email, password, name, created_at)
                VALUES ($1, $2, $3, now())
                RETURNING id, email, name, created_at
            `;

            const result = await pool.query(query, [email, hashedPassword, name]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail (email) {
        try {
            const query = 'SELECT * from users where email = $1';
            const result = await pool.query(query, [email])
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findById (id) {
        try {
            const query = 'SELECT * from users where id = $1';
            const result = await pool.query(query, [id])
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async validatePassword (plainpassword, hashedPassword) {
        return await bcrypt.compare(plainpassword, hashedPassword);
    }
}

module.exports = user;