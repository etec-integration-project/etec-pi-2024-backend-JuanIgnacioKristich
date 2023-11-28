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