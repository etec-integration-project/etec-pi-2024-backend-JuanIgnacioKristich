import { Router } from 'express';
import { createUser, getUserDetails, updateUser, deleteUser, getUser } from '../controllers/user.controllers'

const router = Router();

router.post('/users', createUser);
router.get('/users/:id', getUserDetails);
router.get('/users', getUser);
router.put('/users/:id', updateUser);
router.delete('/user/:id', deleteUser);


export default router;