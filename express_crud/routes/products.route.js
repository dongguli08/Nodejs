const express = require('express');
const productsRouter = express.Router();
const { createProduct, getProductById ,getProducts,updateProduct,deleteProduct} = require('../controllers/products.controller');

// 각각의 POST 요청에 대해 다른 경로 지정
productsRouter.post('/', createProduct);
productsRouter.get('/', getProducts);
productsRouter.get('/:productId', getProductById);
productsRouter.put('/:productId', updateProduct);
productsRouter.delete('/:productId', deleteProduct);

module.exports = productsRouter;
