import { Router } from 'express';
import { registerCart} from '../controllers/Cart.controllers';
import{addToCart} from "../controllers/Cart.controllers"


const router = Router();

router.post('/Cart', registerCart);
router.post('/add-to-cart',addToCart )




export default router;