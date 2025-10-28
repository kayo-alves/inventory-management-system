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

    static async create (req, res) {
        try {
            const { sku, name, selling_price, cost_price, category, stock_quantity, variations } = req.body;
             
            const productData = { sku, name, selling_price, cost_price, category, stock_quantity };

            const validation = ProductService.validateProductData(productData);
            
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    message: `Validation Failed: ${validation.errors.join(', ')}`
                })
            }

            let result;
            if (variations && variations.length > 0) {
                // validade each variations
                for (const variation of variations) {
                    const variationValidation = ProductService.validateProductData(variation, true);
                    if (!variationValidation.isValid) {
                        return res.status(400).json({
                            success: false,
                            message: `Variation ${variation.sku} validation failed:  ${variationValidation.errors.join(', ')}`
                        });
                    }
                }

                // create product with variations
                result = await ProductService.createProductWithVariations(productData, variations);
            } else {
                // create simple product 
                result = await ProductService.createProduct(productData);
            }

            // success response
            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: result
            });
        } catch (error) {
            // validate different types of errors
            if (error.message.includes('already exists')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
    
            if (error.message.includes('Validation failed')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
    
            // 7. Handle server errors
            return res.status(500).json({
                success: false,
                message: error.message || 'Internal server error'
            });
        }
    }
}

module.exports = ProductController;