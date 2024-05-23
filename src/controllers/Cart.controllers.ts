import { Response } from 'express';
import { Request } from 'express';
import { createConnection, Connection } from 'typeorm';
import { AppDataSource } from '../db';
import Cart from "../entities/Cart" 



let connection: Connection | null = null;

export const getDatabaseConnection = async (): Promise<Connection> => {
  if (!connection || !connection.isConnected) {
    connection = await createConnection();
  }
  return connection;
};

export const registerCart = async (req: Request, res: Response) => {
    const { jsonifiedCart } = req.body;

    try {
        const connection = await getDatabaseConnection();
        const cartEntity = new Cart(jsonifiedCart);

        await AppDataSource.manager.save(Cart, cartEntity);

        return res.status(201).json({ message: 'Carrito registrado exitosamente' });

    } catch (err) {
        console.error('Error al registrar el carrito:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};

import { getRepository } from 'typeorm';
import { Products } from '../entities/Products';

// export const addToCart = async (req: Request, res: Response) => {
//   const { productId, quantity } = req.body;
  
//   try {
//     // Buscar el producto en la base de datos
//     const productRepository = getRepository(Products);
//     const product = await productRepository.findOne(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Producto no encontrado' });
//     }

//     // Buscar si el producto ya está en el carrito
//     const cartRepository = getRepository(Cart);
//     let cartItem = await cartRepository.findOne({ where: { firstname: product.firstname } });

//     if (cartItem) {
//       // Si el producto ya está en el carrito, actualizar la cantidad
//       cartItem.quantity += quantity;
//     } else {
//       // Si el producto no está en el carrito, crear un nuevo elemento de carrito
//       cartItem = new Cart();
//       cartItem.firstname = product.firstname;
//       cartItem.Price = product.Price;
//       cartItem.img = product.img;
//       cartItem.quantity = quantity;
//     }

//     // Guardar el elemento de carrito en la base de datos
//     await cartRepository.save(cartItem);

//     return res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
//   } catch (error) {
//     console.error('Error al agregar el producto al carrito:', error);
//     return res.status(500).json({ message: 'Error interno del servidor 2' });
//   }
// };


export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  
  try {
    // Buscar el producto en la base de datos
    const productRepository = getRepository(Products);
    const product = await productRepository.findOne(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Buscar si el producto ya está en el carrito
    const cartRepository = getRepository(Cart);
    let cartItem = await cartRepository.findOne({ where: { firstname: product.firstname } });

    if (cartItem) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cartItem.quantity += quantity;
    } else {
      const await carrito.insert()
      // // Si el producto no está en el carrito, crear un nuevo elemento de carrito
      // cartItem = new Cart();
      // cartItem.firstname = product.firstname;
      // cartItem.Price = product.Price;
      // cartItem.img = product.img;
      // cartItem.quantity = quantity;
    }

    // Guardar el elemento de carrito en la base de datos
    await cartRepository.save(cartItem);

    return res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

