import { RequestHandler } from 'express';
import { Cart } from '../entities/Cart';
import { Products } from '../entities/Products';
import { CartProduct } from '../entities/CartProduct';

export class CartController {
    // Agregar productos al carrito
    addToCart: RequestHandler = async (req, res) => {
        try {
            const { userId, items } = req.body; // items: [{ productId, quantity }]

            // Validar datos
            if (!userId || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: 'Invalid userId or items' });
            }

            // Crear un nuevo carrito si no existe o obtener el existente
            let cart = await Cart.findOne({ where: { userId }, relations: ['cartProducts', 'cartProducts.product'] });

            if (!cart) {
                cart = new Cart();
                cart.userId = userId;
                await cart.save();
            }

            // Agregar productos al carrito
            for (const item of items) {
                const { productId, quantity } = item;
                const product = await Products.findOneBy({ id: productId });

                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${productId} not found` });
                }

                let cartProduct = cart.cartProducts.find(cp => cp.product.id === productId);
                if (cartProduct) {
                    cartProduct.quantity += quantity;
                } else {
                    cartProduct = new CartProduct();
                    cartProduct.cart = cart;
                    cartProduct.product = product;
                    cartProduct.quantity = quantity;
                    cart.cartProducts.push(cartProduct);
                }
                await cartProduct.save();
            }

            await cart.save();
            return res.status(200).json({ message: 'Products added to cart', cart });
        } catch (error) {
            console.error('Error en addToCart:', error);
            return res.status(500).json({ message: 'Error adding products to cart', error });
        }
    }

    // Comprar productos (vaciar el carrito)
    buy: RequestHandler = async (req, res) => {
        try {
            const { userId } = req.body;

            // Obtener el carrito del usuario
            const cart = await Cart.findOne({ where: { userId }, relations: ['cartProducts', 'cartProducts.product'] });

            if (!cart || cart.cartProducts.length === 0) {
                return res.status(404).json({ message: 'Your cart is empty' });
            }

            // Realizar la compra (vaciar carrito)
            cart.cartProducts = [];
            await cart.save();

            return res.status(200).json({ message: 'Compra satisfecha' });
        } catch (error) {
            console.error('Error en buy:', error);
            return res.status(500).json({ message: 'Error completing purchase', error });
        }
    }
}
