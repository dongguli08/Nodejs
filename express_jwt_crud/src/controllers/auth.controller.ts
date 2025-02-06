import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser,getprofileUser } from '../service/auth.service'




export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// controllers/auth.controller.ts


export const getprofile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user =  getprofileUser(req); // 사용자 정보 가져오기

    if (!user) {
       res.status(404).json({ message: 'User not found' }); // 사용자 정보가 없으면 404 응답
    }
    console.log(user)
    res.json({'user':user}); // 사용자 정보 응답
  } catch (error) {
    next(error); // 에러 처리
  }
};

