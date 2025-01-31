import express from 'express'
import { AppDataSource } from '../data.source';
import { User } from "../entiry/user"


const app = express();
app.use(express.json())


async function createProducts(req, res, next) {
    try {
        const user = AppDataSource.getRepository(User).create(req.body);
        console.log(user);
        const results = await AppDataSource.getRepository(User).save(user);
        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
}

// app.post('/users', async (req, res): Promise<any> => {
//     const user = AppDataSource.getRepository(User).create(req.body);
//     console.log(user);
//     const results = await AppDataSource.getRepository(User).save(user);
//     return res.send(results);
// });
    
async function getProducts(req, res, next) {
    try {
        const users = await AppDataSource.getRepository(User).find();  // await 추가
        res.json(users);  // 데이터 반환
    } catch (error) {
        next(error);  // 에러 처리
    }
}



// app.get("/users",async(req,res)=>{
//     const results = await AppDataSource.getRepository(User).find();
//     res.json(results)
// })


async function getProductById(req, res, next) {
    try {
        const user = await AppDataSource.getRepository(User).findOneBy({
            id: Number(req.params.id)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        next(error);
    }
}



// app.get('/users/:id',async(req,res):Promise<any>=>{ //그 아이디유저 하나만 가져오기
//     const results = await AppDataSource.getRepository(User).findOneBy({
//         id:Number(req.params.id)
//     })
//     return res.json(results);
// })


async function updateProduct(req,res,next) {
    try{
        const user = await AppDataSource.getRepository(User).findOneBy({
            id:Number(req.params.id)
        });
        AppDataSource.getRepository(User).merge(user,req.body);
        const results = await AppDataSource.getRepository(User).save(user);
        return res.send(results)
    }catch(error){
        next(error);
    }
}

// app.put('/users/:id',async (req,res):Promise<any>=>{
//     const user = await AppDataSource.getRepository(User).findOneBy({
//         id:Number(req.params.id)
//     })
//     AppDataSource.getRepository(User).merge(user,req.body);
//     const results = await AppDataSource.getRepository(User).save(user);
//     return res.send(results)
// })

async function deleteProduct(req,res,next) {
    try{
        const user = await AppDataSource.getRepository(User).delete(req.params.id)
        return res.json(user)
    }catch(error){
        next(error);
    }
}

// app.delete('/users/:id',async(req,res):Promise<any>=>{
//     const result = await AppDataSource.getRepository(User).delete(req.params.id) // /:id여서 params.id사용
//     res.json(result);
// })

module.exports={
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}