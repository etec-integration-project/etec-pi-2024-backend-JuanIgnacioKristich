import { Router } from 'express';
import { createProducts, getProducts, updateProducts, getProduct,deleteProducts} from '../controllers/Productos.controllers';

const router = Router();

router.post('/products', createProducts);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);



export default router;