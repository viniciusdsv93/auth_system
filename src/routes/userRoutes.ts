import { Router } from 'express';
import { getUsers, register, deleteUsers } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.post('/register', register);
router.delete('/users', deleteUsers);

export default router;
