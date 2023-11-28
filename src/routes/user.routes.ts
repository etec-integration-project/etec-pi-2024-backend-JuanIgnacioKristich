import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUser } from '../controllers/user.controllers'

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/user/:id', deleteUser);


export default router;