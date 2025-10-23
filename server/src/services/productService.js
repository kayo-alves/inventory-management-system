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
}

module.exports = ProductService