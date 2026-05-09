import { Router } from 'express';
import { getUsers, register, deleteUsers, login } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/users', deleteUsers);

export default router;
