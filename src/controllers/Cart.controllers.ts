// src/controllers/cartController.ts
import { Repository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { Products } from '../entities/Products';

// Función para agregar productos al carrito
// src/controllers/Cart.controllers.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

// Función para agregar productos al carrito
export const addToCart = async (req: Request, res: Response) => {
    const { cartName, firstname, productId, quantity } = req.body;

    const cartRepository = getRepository(Cart);
    const productRepository = getRepository(Products);

    try {
        const product = await productRepository.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingCartItem = await cartRepository.findOne({
            where: { cart: cartName, firstname, img: product.img }
        });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.price += product.Price * quantity;
            await cartRepository.save(existingCartItem);
            return res.json(existingCartItem);
        }

        const cartItem = new Cart(cartName);
        cartItem.firstname = firstname;
        cartItem.price = product.Price * quantity;
        cartItem.img = product.img;
        cartItem.quantity = quantity;

        await cartRepository.save(cartItem);
        return res.json(cartItem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Función para obtener los items del carrito
export const getCartItems = async (req: Request, res: Response) => {
    const { cartName, firstname } = req.query;

    const cartRepository = getRepository(Cart);

    try {
        const cartItems = await cartRepository.find({
            where: {
                cart: cartName as string,
                firstname: firstname as string
            }
        });
        return res.json(cartItems);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
