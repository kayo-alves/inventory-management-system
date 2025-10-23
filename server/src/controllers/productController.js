const ProductService = require('../services/productService');

class ProductController {
    // controler that supports sorting via query parameters
    static async getAll(req, res) {
        try {
            // whitelist for allowed query values
            const allowedSortBy = [
                'created_at',
                'name',
                'selling_price',
                'cost_price',
                'category',
                'stock_quantity'
            ]
            const allowedSortOrder = ['ASC', 'DESC'];

            // sets defaults for sortBy and sortOrder, but checks the URL query
            let { sortBy = 'created_at', sortOrder = 'DESC' } = req.query

            // if sortBy and SortOrder query values aren't inside whitelist, return to default
            if (!allowedSortBy.includes(sortBy)) sortBy = 'created_at';
            if (!allowedSortOrder.includes(sortOrder)) sortOrder = 'DESC';

            // calls all products throught productService
            const products = await ProductService.getAllProducts(sortBy, sortOrder)

            return res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: products
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Failed to retrieve products"
            });
        }
    }
}

module.exports = ProductController;