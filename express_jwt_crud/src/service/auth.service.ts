import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source'; // 데이터베이스 연결
import { User } from '../entities/user';

const secretKey = 'yourSecretKey'; // JWT 비밀키

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  const { username, email, password } = userData;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = hashedPassword;

  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.save(user);
};

export const loginUser = async (loginData: { username: string; password: string }) => {
  const { username, password } = loginData;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ username });

  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  // JWT 토큰 생성
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  return token;
};

// service/auth.service.ts

export const getprofileUser =  (req: any) => {
    const user = req.user; // 미들웨어에서 추가된 사용자 정보
    if(!user)console.log("12323")
      console.log(user)
    return user; // 사용자 ID 반환 (필요에 따라 수정)
  };
  
// 예를 들어, 한 함수 안에서 여러 번 userRepository를 사용한다면 매번 AppDataSource.getRepository(User)를 호출하는
//  대신, 한 번만 userRepository를 선언해두고 사용할 수 있다.

// AppDataSource.getRepository(User)를 매번 호출하는 것보다는 userRepository라는 
// 명확한 변수를 선언하고 사용하는 것이 가독성을 높일 수 있다.