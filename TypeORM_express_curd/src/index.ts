import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data.source';
const productsRouter = require('./routes/products.routes')

const app = express();
const port = 4000;


AppDataSource       //TypeORM의 DataSource 객체를 사용해 데이터베이스 연결을 초기화하는 메서드야.
    .initialize()
    .then(()=>{
        console.log('성공')
    })
    .catch((err)=>{
        console.error(err)
    })


app.use(express.json());
app.use(morgan("dev"));   // 요청에 대한 정보를 dev 포맷으로 로깅


app.use('/products',productsRouter); //products 요청을 받아서 productsRouter가 처리


app.listen(port, ()=>{
    console.log(`서버가 ${port}번 포트에서 실행중`)
})