import { Router } from 'express';
import { CartController } from '../controllers/Cart.controllers';

const router = Router();
const cartController = new CartController();

// Definir la ruta para agregar productos al carrito
router.post('/add', cartController.addToCart);

// Definir la ruta para comprar productos del carrito
router.post('/buy', cartController.buy);

export default router;
