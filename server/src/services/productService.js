const Product = require ('../models/product')

class ProductService {
    static async getAllProducts(sortBy = 'created_at', sortOrder = 'DESC') {
        try {
            const products = await Product.findAll();

            const sortedProducts = this.sortProducts(products, sortBy, sortOrder)

            return sortedProducts;
        } catch (error) {
            throw error;
        }
    }

    // function to sort products in ASC or DESC order
    static sortProducts(products, sortBy, sortOrder)  {
        return products.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'created_at' || sortBy === 'updated_at') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortBy === 'selling_price' || sortBy === 'cost_price' || sortBy === 'stock_quantity') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }

            if (sortOrder === 'ASC') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    static async createProduct(productData) {
        try {
            // 1. check sku uniqueness
            const existingSku = await Product.findBySku(productData.sku)
            if (existingSku) {
                throw new Error('SKU already exists');
            }

            const createdProduct = await Product.create(productData);
            return createdProduct;
        } catch (error) {
            throw error;
        }
    }

    static async createProductWithVariations(ParentData, variationsArray) {
        try {
            // 1. check sku uniqueness
            const existingParentSku = await Product.findBySku(ParentData.sku)
            if (existingParentSku) {
                throw new Error(`Parent SKU ${ParentData.sku} already exists`);
            }
            // 2. Validate variations array
            if (!variationsArray || variationsArray.length === 0) {
                throw new Error('At least one variation is required');
            }

            for (const variation of variationsArray) {
                const existingVariationSku = await Product.findBySku(variation.sku)
                if (existingVariationSku) {
                    throw new Error(`Variation SKU ${variation.sku} already exists`);
                }
            }

            const createdProductWithVariations = await Product.createWithVariations(ParentData, variationsArray);
            return createdProductWithVariations;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validate product data for required fields and data types
     * @param {Object} data - Product data to validate
     * @returns {Object} { isValid: boolean, errors: string[] }
     */
    static validateProductData(data, isVariation = false) {
        const errors = [];

        // Check required fields
        if (!data.sku || typeof data.sku !== 'string' || data.sku.trim() === '') {
            errors.push('SKU is required and must be a non-empty string');
        }
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push('Name is required and must be a non-empty string');
        }
        // Only require category for parent products, not variations
        if (!isVariation) {
            if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
                errors.push('Category is required for parent product and must be a non-empty string');
            }
        }
        // Check numeric fields
        if (typeof data.selling_price !== 'number' || data.selling_price <= 0) {
            errors.push('Selling price must be a positive number');
        }
        if (typeof data.cost_price !== 'number' || data.cost_price <= 0) {
            errors.push('Cost price must be a positive number');
        }
        if (typeof data.stock_quantity !== 'number' || data.stock_quantity < 0) {
            errors.push('Stock quantity must be a non-negative number');
        }
        // Check business rules
        if (data.selling_price && data.cost_price && data.selling_price <= data.cost_price) {
            errors.push('Selling price must be greater than cost price');
        }
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

module.exports = ProductService