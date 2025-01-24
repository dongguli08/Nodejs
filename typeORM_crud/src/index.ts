import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const app = express();

app.use(express.json()); //미들웨어를 등록하기 위한 함수 app.use
app.use(morgan("dev"))//로그를 위한 미들웨어

app.get('/',(req,res)=>{
    res.send('running')
})

AppDataSource       //TypeORM의 DataSource 객체를 사용해 데이터베이스 연결을 초기화하는 메서드야.
    .initialize()
    .then(()=>{
        console.log('성공')
    })
    .catch((err)=>{
        console.error(err)
    })


    
       
app.post('/users', async (req, res): Promise<any> => {
    const user = AppDataSource.getRepository(User).create(req.body);
    console.log(user);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
});
    
app.get("/users",async(req,res)=>{
    const results = await AppDataSource.getRepository(User).find();
    res.json(results)
})

app.get('/users/:id',async(req,res):Promise<any>=>{ //그 아이디유저 하나만 가져오기
    const results = await AppDataSource.getRepository(User).findOneBy({
        id:Number(req.params.id)
    })
    return res.json(results);
})


app.put('/users/:id',async (req,res):Promise<any>=>{
    const user = await AppDataSource.getRepository(User).findOneBy({
        id:Number(req.params.id)
    })
    AppDataSource.getRepository(User).merge(user,req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results)
})

app.delete('/users/:id',async(req,res):Promise<any>=>{
    const result = await AppDataSource.getRepository(User).delete(req.params.id) // /:id여서 params.id사용
    res.json(result);
})

const port = 4000;
app.listen(port,()=>{
    console.log(`Server Running at http://localhost:${port}`);
})

