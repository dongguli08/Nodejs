import { Router } from 'express';
import { register, login, getprofile } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile',authMiddleware,getprofile)

export default router;
