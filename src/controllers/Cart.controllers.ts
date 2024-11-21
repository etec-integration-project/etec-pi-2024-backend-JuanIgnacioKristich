import { Request, Response } from 'express';
import { Cart } from '../entities/Cart'; // Con export { Cart }
import { Products } from '../entities/Products';

export class CartController {

    // Agregar productos al carrito
    async addToCart(req: Request, res: Response) {
        try {
            const { userId, productIds } = req.body;

            // Obtener los productos seleccionados por su id
            const products = await Products.findByIds(productIds);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            // Crear un nuevo carrito y agregarle los productos
            const cart = new Cart();
            cart.userId = userId;
            cart.products = products;
            await cart.save();

            return res.status(200).json({ message: 'Products added to cart', cart });
        } catch (error) {
            return res.status(500).json({ message: 'Error adding products to cart', error });
        }
    }

    // Comprar productos (vaciar el carrito)
    async buy(req: Request, res: Response) {
        try {
            const { userId } = req.body;

            // Obtener el carrito del usuario
            const cart = await Cart.findOne({
                where: { userId },
                relations: ['products']
            });

            if (!cart || cart.products.length === 0) {
                return res.status(404).json({ message: 'Your cart is empty' });
            }

            // Realizar la compra (vaciar carrito)
            cart.products = [];
            await cart.save();

            return res.status(200).json({ message: 'Compra satisfecha' });
        } catch (error) {
            return res.status(500).json({ message: 'Error completing purchase', error });
        }
    }
}

