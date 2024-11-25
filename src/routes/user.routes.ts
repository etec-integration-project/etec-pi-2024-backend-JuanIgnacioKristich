import { Router } from 'express';
import { createUser, getUserDetails, updateUser, deleteUser } from '../controllers/user.controllers'

const router = Router();

router.post('/users', createUser);
router.get('/users', getUserDetails);
router.put('/users/:id', updateUser);
router.delete('/user/:id', deleteUser);


export default router;