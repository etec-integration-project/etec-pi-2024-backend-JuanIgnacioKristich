import { Router } from 'express';
import { createProducts, getProducts, updateProducts, getProduct,deleteProducts,createArrayProducts} from '../controllers/Productos.controllers';

const router = Router();

router.post('/products', createProducts);
router.post('/products_array', createArrayProducts);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);



export default router;