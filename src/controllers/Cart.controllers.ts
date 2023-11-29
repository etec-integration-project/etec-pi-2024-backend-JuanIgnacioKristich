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


