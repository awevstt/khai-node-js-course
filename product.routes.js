const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// Handle GET request for path /products
router.get('/products', (request, response) => {
   return response.json(products); // Return all products
});

// Handle GET request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   if (filteredProducts.length > 0) {
       response.json(filteredProducts); // Send the filtered products as a JSON response
   } else {
       response.status(404).json({ message: `No products found for brand: ${brand}` });
   }
});

//EXTRA_TASK!

// Handle GET request for path /products/id/:id
router.get('/products/id/:id', (request, response) => {
   const { id } = request.params; // Get the id parameter from the URL

   // Find product by id
   const product = products.find(product => product.id === parseInt(id, 10));

   if (product) {
       response.json(product); // Return the found product
   } else {
       response.status(404).json({ message: "Product not found" });
   }
});

// Handle GET request that triggers an error
router.get('/productswitherror', (request, response) => {
   let err = new Error("Processing error");
   err.statusCode = 400;
   throw err;
});

module.exports = router;
