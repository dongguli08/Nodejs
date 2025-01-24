const { default: mongoose } = require('mongoose');
const productsRouter = require("./routes/products.route");
const express = require('express');
const app = express();
const port = 3000;

mongoose.set('strictQuery', false);
mongoose.set('debug', true);

// MongoDB 연결
mongoose.connect('mongodb+srv://hadonggun1124:hugh1124**@cluster0.n2ssi.mongodb.net/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use(express.json()); // JSON 형식의 요청 본문을 처리하기 위해 사용하는 미들웨어
app.use(express.urlencoded({ extended: false })); // HTML form 데이터 처리
 
app.use('/products', productsRouter);  // /products 경로로 요청을 받아서 productsRouter가 처리


// 서버 실행
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
