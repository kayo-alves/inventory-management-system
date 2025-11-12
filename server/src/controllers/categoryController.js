const Category = require('../models/category');

class CategoryController {
    static async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            res.status(200).json({
                success: true,
                message: 'Categories retrieved successfully',
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Failed to retrieve categories"
            });
        }
    }
}

module.exports = CategoryController;
