import { Request, Response } from 'express';
import {Products} from "../entities/Products"

export const createProducts = async (req: Request, res: Response) => {

    try {
        const { firstname, Price, img } = req.body;

        const prod = new Products();
        prod.firstname = firstname;
        prod.Price = Price;
        prod.img = img;

        await prod.save();

        return res.json(prod);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export const createArrayProducts = async (req: Request, res: Response) => {
    try {
        // Verificar si la solicitud contiene un array de productos
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: 'Se esperaba un array en el cuerpo de la solicitud.' });
        }

        // Procesar cada producto del array recibido
        const savedProducts = await Promise.all(req.body.map(async (product: any) => {
            const { firstname, Price, img } = product;
            const prod = new Products();
            prod.firstname = firstname;
            prod.Price = Price;
            prod.img = img;
            return await prod.save(); // Guardar el producto y devolverlo
        }));

        return res.json(savedProducts); // Devolver los productos guardados
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Ocurrió un error interno del servidor.' });
        }
    }
}

export const getProducts = async (req: Request, res: Response) => {

    try {
        const prod = await Products.find();
        return res.json(prod);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export const updateProducts = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const prod = await Products.findOneBy({ id: parseInt(req.params.id) });

        if (!prod) return res.status(404).json({ message: 'prod does not exist' });

        await Products.update({ id: parseInt(id) }, req.body);

        return res.sendStatus(204);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
}



export const deleteProducts = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const result = await Products.delete({ id: parseInt(id) });

        if (result.affected === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        return res.status(204);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

export const getProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;

        const prod = await Products.findOneBy({ id: parseInt(id) });

        return res.json(prod);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }

    }

}