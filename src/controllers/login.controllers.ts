import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    const { Email, Password } = req.body;
    try {
        // Buscar el usuario en la base de datos
        const comparador = await AppDataSource.manager.findOne(User, { where: { Email, Password } });
        
        if (comparador) {
            // Si el usuario existe, generar un token
            const token = jwt.sign(
                { userId: comparador.userId }, // Datos que se incluyen en el token
                "tu_llave_secreta", // Llave secreta para firmar el token
                { expiresIn: "3h" } // Tiempo de expiración del token
            );
            
            // Enviar el token como parte de la respuesta
            res.json({ mensaje: "ingreso correcto", token });
        } else {
            res.status(400).json({ mensaje: "ingreso fallido" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

