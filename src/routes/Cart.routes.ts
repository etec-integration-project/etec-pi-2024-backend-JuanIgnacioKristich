import { Router } from 'express';
import { CartController} from '../controllers/Cart.controllers';

const router = Router();
const cartController = new CartController();

router.post('/cart/add', cartController.addToCart);

router.post('/cart/buy', cartController.buy);


export default router;