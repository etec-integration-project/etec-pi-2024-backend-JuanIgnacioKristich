import { Router } from 'express';
import { addToCart, getCartItems } from '../controllers/Cart.controllers';

const router = Router();

router.post('/addToCart', addToCart);

router.get('/getCart', getCartItems );

export default router
