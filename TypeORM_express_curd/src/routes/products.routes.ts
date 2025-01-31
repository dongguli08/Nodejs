import express from 'express';
const productsRouter = express.Router();
const {createProducts,getProducts,getProductById,updateProduct,deleteProduct} = require('../contoroller/products.controller')

productsRouter.post('/', createProducts);
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductById);
productsRouter.put('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter