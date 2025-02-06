import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { AppDataSource } from './data-source'; // 데이터베이스 연결
import authRouter from './router/auth.router';
const app = express();

// 미들웨어 설정
app.use(morgan('dev'));
app.use(bodyParser.json());

// 라우팅 설정
app.use('/user', authRouter);


// 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));


  // 서버 시작
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
