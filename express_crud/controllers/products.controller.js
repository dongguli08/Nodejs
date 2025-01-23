const productModel = require('../model/products.model');
const mongoose = require('mongoose');  // mongoose 추가

async function createProduct(req,res,next){
    try{
        const createProduct = await productModel.create(req.body);
        res.status(201).json(createProduct);
    }catch(error){
        next(error)
    }
}


async function getProducts(req,res,next){
try{
    const allProducts =  await productModel.find({});
    res.status(200).json(allProducts);
 }catch (error){
    next(error)
 }
} 

async function getProductById(req, res, next) {
    const { productId } = req.params; // /:productId이 값을 params로 가져와서 productId에 넣음
    
    // productId가 유효한 ObjectId인지 확인
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }

    try {
        const product = await productModel.findById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req,res,next){
    try{
        let updateProduct = await productModel.findByIdAndUpdate(
            req.params.productId, //update할 id을 넣어줌
            req.body,
            {new:true} //없데이트가 됨
        )
        if(updateProduct){
            res.status(200).json(updateProduct)
        }else{
            res.status(404).send()
        }
    }catch(error){
        next(error);
    }
}

async function deleteProduct(req,res,next){
    try{
        let deleteProduct = await productModel.findByIdAndDelete(req.params.productId);
        if(deleteProduct){
            res.status(200).json(deleteProduct);
        }else{
            res.status(404).send();
        }
    }catch(error){
        next(error)
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}