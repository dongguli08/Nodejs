// middleware/auth.middleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'yourSecretKey';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token 방식

  if (!token) {
     res.status(403).json({ message: 'No token provided' }); // 응답 후 함수 종료
  }

  try {
    // 토큰 검증
    const decoded = await new Promise<any>((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject('Invalid token');
        }
        resolve(decoded);
      });
    });

    // 토큰에서 추출한 사용자 정보를 req.body에 저장
    req.user = decoded;

    // 인증 완료 후 다음 미들웨어로 넘어감
    next();
  } catch (err) {
     res.status(403).json({ message: 'Invalid token' }); // 응답 후 함수 종료
  }
};
