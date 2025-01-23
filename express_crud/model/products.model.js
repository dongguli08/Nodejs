const mongoose = require('mongoose');

//이 코드에서 사용한 odm은 mongoose

// Product 스키마 정의
const productSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 5,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
});

// Product 모델 생성
const Product = mongoose.model('Product', productSchema);

module.exports = Product;