import { Router } from 'express';
import { registerCart} from '../controllers/Cart.controllers';

const router = Router();

router.post('/Cart', registerCart);




export default router;